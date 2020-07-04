import React, { ReactNode, useEffect, useState, useMemo, useContext } from "react";
import { configQuery } from "../lib/queries";
import { useQuery } from "@apollo/react-hooks";
import { isValidWebRingConfig, WebRingConfig, ConfigValidationError } from "@wcauchois/wring-schema";
import { Card, List, Message, Loader } from "semantic-ui-react";
import { SuccessMessage, FailureMessage, WarningMessage, InformationMessage } from "./customMessages";
import axios from "axios";
import { configUrlForSite, fetchSiteConfig } from "../lib/utils";

const SeenUrlsContext = React.createContext<{
  seenUrls: Set<string>;
  setSeenUrls(value: Set<string>): void;
}>(undefined as any);

type ConfigUrlResult = {
  kind: "url";
  url: string;
} | {
  kind: "ownSite"
};

type ConfigResult = {
  kind: "loaded";
  config: WebRingConfig;
} | {
  kind: "invalid";
  errors: string[];
} | {
  kind: "fetchError";
  err: Error;
};

interface SiteCardProps {
  config?: WebRingConfig;
  urlResult?: ConfigUrlResult;
  messages: ReactNode[];
}

function LoadingCard() {
  return (
    <Card>
      <Card.Description>
        <Loader inline active />
      </Card.Description>
    </Card>
  );
}

function SiteCard({ config, urlResult, messages }: SiteCardProps) {
  let metaDescription: ReactNode | null = null;

  if (urlResult) {
    if (urlResult.kind === "ownSite") {
      metaDescription = `This is your site.`;
    } else if (urlResult.kind === "url") {
      metaDescription = <a href={urlResult.url} target="_blank">{urlResult.url}</a>;
    }
  }

  return (
    <Card>
      <Card.Content>
        <Card.Header>
          {config?.name ?? `Unknown Site`}
        </Card.Header>

        {metaDescription && <Card.Meta>
          {metaDescription} 
        </Card.Meta>}

        <Card.Description>
          {config && <List>
            <List.Item>
              <List.Header>
                Previous Site
              </List.Header>
              <List.Description>
                <a href={config.prev[0].site} target="_blank">
                  {config.prev[0].site}
                </a>
              </List.Description>
            </List.Item>
            <List.Item>
              <List.Header>
                Next Site
              </List.Header>
              <List.Description>
                <a href={config.next[0].site} target="_blank">
                  {config.next[0].site}
                </a>
              </List.Description>
            </List.Item>
          </List>}

          <List>
            {messages.map((m, i) => (
              <List.Item key={i}>
                {m}
              </List.Item>
            ))}
          </List>

        </Card.Description>
      </Card.Content>
    </Card>
  );
}

interface SiteLoaderProps {
  targetUrl: string;
  prevConfig?: WebRingConfig;
  nextConfig?: WebRingConfig;
}

function SiteLoader({
  targetUrl,
  prevConfig,
  nextConfig
}: SiteLoaderProps) {
  const [configResult, setConfigResult] = useState<ConfigResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function doFetch() {
      try {
        const config = await fetchSiteConfig(targetUrl);
        setConfigResult({
          kind: "loaded",
          config
        });
      } catch (err) {
        if (err instanceof ConfigValidationError) {
          setConfigResult({
            kind: "invalid",
            errors: err.errors.map(e => e.message ?? "")
          });
        } else {
          setConfigResult({
            kind: "fetchError",
            err
          });
        }
      } finally {
        setLoading(false);
      }
    }
    doFetch();
  }, [targetUrl]);

  let body: JSX.Element = <React.Fragment />;
  if (loading) {
    body = <LoadingCard />;
  } else if (configResult) {
    body = <SiteItem
      configResult={configResult}
      urlResult={{ kind: "url", url: targetUrl }}
      prevConfig={prevConfig}
      nextConfig={nextConfig} />
  }

  return body;
}

function DedupedSiteLoader(props: SiteLoaderProps) {
  const { targetUrl } = props;
  const { seenUrls, setSeenUrls } = useContext(SeenUrlsContext);
  const [isDupe, setIsDupe] = useState<boolean | null>(null);
  const [didRun, setDidRun] = useState(false);

  useEffect(() => {
    if (didRun) {
      return;
    }
    if (seenUrls.has(targetUrl)) {
      setIsDupe(true);
    } else {
      const newValue = new Set(seenUrls);
      newValue.add(targetUrl);
      setSeenUrls(newValue);
      setDidRun(true);
      setIsDupe(false);
    }
    setDidRun(true);
  }, [targetUrl, seenUrls, didRun]);

  if (isDupe === null) {
    return null;
  } else {
    return isDupe ? (
      <SiteCard
        urlResult={{ kind: "url", url: targetUrl }}
        messages={[
          <InformationMessage>
            This site has already been visited. That means the web ring is over.
          </InformationMessage>
        ]} />
    ) : (
      <SiteLoader {...props} />
    );
  }
}

interface SiteItemProps {
  configResult: ConfigResult;
  urlResult: ConfigUrlResult;
  prevConfig?: WebRingConfig;
  nextConfig?: WebRingConfig;
}

function SiteItem({
  configResult,
  urlResult,
  prevConfig,
  nextConfig
}: SiteItemProps) {
  let body: JSX.Element = <React.Fragment />;

  if (configResult.kind === "loaded") {
    const config = configResult.config;
    return (
      <>
        {!prevConfig && config.prev.length > 0 && <DedupedSiteLoader targetUrl={configUrlForSite(config.prev[0].site)} nextConfig={config} />}
        <SiteCard
          config={config}
          urlResult={urlResult}
          messages={[]} />
        {!nextConfig && config.next.length > 0 && <DedupedSiteLoader targetUrl={configUrlForSite(config.next[0].site)} prevConfig={config} />}
      </>
    );
  } else if (configResult.kind == "fetchError") {
    return (
      <SiteCard
        urlResult={urlResult}
        messages={[
          <FailureMessage>
            Failed to fetch the web ring config: {configResult.err.message}
          </FailureMessage>
        ]} />
    );
  } else if (configResult.kind === "invalid") {
    return (
      <SiteCard
        urlResult={urlResult}
        messages={[
          <FailureMessage>
            We fetched the config, but it failed validation with the following errors:
            <List bulleted>
              {configResult.errors.map((e, i) => (
                <List.Item key={i}>
                  {e}
                </List.Item>
              ))}
            </List>
          </FailureMessage>
        ]} />
    )
  }

  return body;
}

function RingViewerMain({ config }: { config: WebRingConfig }) {
  const [seenUrls, setSeenUrls] = useState(new Set<string>());
  const contextValue = useMemo(() => ({
    seenUrls,
    setSeenUrls
  }), [seenUrls, setSeenUrls]);
  return (
    <Card.Group style={{ overflowX: 'scroll', flexWrap: 'nowrap' }}>
      <SeenUrlsContext.Provider value={contextValue}>
        <SiteItem configResult={{ kind: "loaded", config }} urlResult={{ kind: "ownSite" }} />
      </SeenUrlsContext.Provider>
    </Card.Group>
  )
}

export default function RingViewer() {
  const { data } = useQuery(configQuery);

  if (data && data.config && isValidWebRingConfig(data.config.data)) {
    return <RingViewerMain config={data.config.data} />;
  } else {
    return null;
  }
}
