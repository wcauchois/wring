import { h } from "preact";
import { useEffect } from "preact/hooks";
import styled from "styled-components";

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
  useEffect(() => {
    async function doFetch() {
      const response = await fetch('/web-ring.json');
      const json = await response.json();
      console.log(`Got the data:`, json);
    }
    doFetch();
  });

  return (
    <Body>
      <Description>
        This site is part of the <strong>cool dank</strong> web ring.
      </Description>
      <ButtonContainer>
        <Button href="https://example.com">
          Prev
        </Button>
        <Button href="https://example.com">
          Next
        </Button>
      </ButtonContainer>
    </Body>
  );
}
