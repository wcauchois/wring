import React from "react";
import { Header } from "semantic-ui-react";
import ConfigEditor from "./ConfigEditor";

export default function Home() {
  return (
    <>
      <Header as="h1">Web Ring Management Interface</Header>
      <ConfigEditor />
    </>
  );
}
