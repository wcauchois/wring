import React, { ReactNode, useEffect, useState, useReducer, useRef } from "react";
import { configQuery, websiteTitleQuery } from "../lib/queries";
import { useQuery } from "@apollo/react-hooks";
import { isValidWebRingConfig, WebRingConfig } from "@wcauchois/wring-schema";
import { Card, List, Loader, Label, Segment } from "semantic-ui-react";
import RingCrawler, { BaseRingSite } from "../lib/RingCrawler";
import { uniqueId } from "../lib/utils";

function SiteTitle({ url }: { url: string }) {
  const { data } = useQuery(websiteTitleQuery, {
    variables: { url }
  });

  return <>
    {data?.websiteTitle ?? `Unknown Site`}
  </>;
}

interface SiteCardProps {
  site: BaseRingSite;
}

function SiteCard({ site }: SiteCardProps) {
  let metaDescription: ReactNode | null = null;

  if (site.isOwnSite) {
    metaDescription = `This is your site.`;
  } else {
    metaDescription = (
      <a href={site.configUrl} target="_blank">
        {site.configUrl}
      </a>
    );
  }

  const [config, setConfig] = useState<WebRingConfig | undefined>(undefined);
  const [, setNext] = useState<BaseRingSite | undefined>(undefined);
  const [, setPrev] = useState<BaseRingSite | undefined>(undefined);

  const mounted = useRef(true);
  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, [mounted]);

  const messages: JSX.Element[] = []; // TODO

  useEffect(() => {
    async function doPopulate() {
      if (mounted.current) {
        setConfig(await site.maybeConfig);
        setNext(await site.next);
        setPrev(await site.prev);
      }
    }
    doPopulate();
  }, [site]);

  const style: React.CSSProperties = {
    minWidth: `300px`
  };
  if (site.isOwnSite) {
    style.border = `3px solid #ffe319`;
  }

  return (
    <Card style={style}>
      <Card.Content>
        <Card.Header>
          <SiteTitle url={site.url} />
        </Card.Header>

        {metaDescription && <Card.Meta>{metaDescription}</Card.Meta>}

        <Card.Description>
          {config && (
            <List>
              <List.Item>
                <List.Header>Previous Site</List.Header>
                <List.Description>
                  <a href={config.prev[0].site} target="_blank">
                    {config.prev[0].site}
                  </a>
                </List.Description>
              </List.Item>
              <List.Item>
                <List.Header>Next Site</List.Header>
                <List.Description>
                  <a href={config.next[0].site} target="_blank">
                    {config.next[0].site}
                  </a>
                </List.Description>
              </List.Item>
            </List>
          )}

          <List>
            {messages.map((m, i) => (
              <List.Item key={i}>{m}</List.Item>
            ))}
          </List>
        </Card.Description>
      </Card.Content>
    </Card>
  );
}

function RingViewerMain({ config }: { config: WebRingConfig }) {
  const [crawler] = useState(
    () => new RingCrawler(`https://example.com`, config)
  );
  const [loading, setLoading] = useState(true);

  const mounted = useRef(true);
  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, [mounted]);

  const [{ nextSites, prevSites }, dispatch] = useReducer(
    (
      state: { nextSites: BaseRingSite[]; prevSites: BaseRingSite[] },
      { site, direction }: { site: BaseRingSite; direction: "prev" | "next" }
    ) => {
      const newPrevSites = state.prevSites.slice();
      const newNextSites = state.nextSites.slice();
      if (direction === "prev") {
        newPrevSites.unshift(site);
      } else if (direction === "next") {
        newNextSites.push(site);
      }
      return {
        nextSites: newNextSites,
        prevSites: newPrevSites,
      };
    },
    {
      nextSites: [],
      prevSites: [],
    }
  );

  useEffect(() => {
    async function doPopulate(direction: "next" | "prev") {
      for await (const site of crawler.iterDirection(direction)) {
        if (mounted.current) {
          dispatch({ site, direction });
        }
      }
    }
    async function populateAll() {
      await Promise.all([doPopulate("next"), doPopulate("prev")]);
      if (mounted.current) {
        setLoading(false);
      }
    }
    populateAll();
  }, [mounted, crawler]);

  return (
    <Segment basic>
      {loading && (
        <Label attached="top right">
          <Loader active inline size="tiny" /> Loading
        </Label>
      )}
      <Card.Group style={{ overflowX: "scroll", flexWrap: "nowrap" }}>
        {prevSites.map((site, i) => (
          <SiteCard key={i} site={site} />
        ))}
        <SiteCard site={crawler.ownSite} />
        {nextSites.map((site, i) => (
          <SiteCard key={i} site={site} />
        ))}
      </Card.Group>
    </Segment>
  );
}

export default function RingViewer() {
  const { data } = useQuery(configQuery);
  const [key, setKey] = useState("initial");

  useEffect(() => {
    setKey(uniqueId());
  }, [data]);

  if (data && data.config && isValidWebRingConfig(data.config.data)) {
    return <RingViewerMain key={key} config={data.config.data} />;
  } else {
    return null;
  }
}
