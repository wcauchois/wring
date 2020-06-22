import { h } from "preact";
import { useEffect, useState } from "preact/hooks";
import styled from "styled-components";
import { WebRingConfig } from "@wcauchois/wring-schema";

const Body = styled.div`
  font-family: sans-serif;
  margin-bottom: 20px;
  padding: 10px;
  box-shadow: 0 0 4px 0 rgba(0,0,0,.2);
  display: flex;
  flex-direction: column;
  background: white;
`;

const Description = styled.div`
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Button = styled.a`
  display: inline-block;
  text-decoration: none;
  color: white;
  text-shadow: black 0.1em 0.1em 0.2em;
  padding: 3px;
  margin: 2px;
`;

export default function WebRingWidget() {
  const [config, setConfig] = useState<WebRingConfig | null>(null);

  useEffect(() => {
    async function doFetch() {
      const response = await fetch('/web-ring.json');
      const data = await response.json();
      setConfig(data);
    }
    doFetch();
  });

  const nextHref = config?.next?.[0]?.site;
  const prevHref = config?.prev?.[0]?.site;

  return (
    <Body>
      <Description>
        This site is part of the <strong>{config?.name}</strong> web ring.
      </Description>
      <ButtonContainer>
        {prevHref && <Button href={prevHref}>
          Prev
        </Button>}
        {nextHref && <Button href={nextHref}>
          Next
        </Button>}
      </ButtonContainer>
    </Body>
  );
}
