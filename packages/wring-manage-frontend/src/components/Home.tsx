import React from "react";
import { Header } from "semantic-ui-react";
import ConfigEditor from "./ConfigEditor";
import RingViewer from "./RingViewer";

export default function Home() {
  return (
    <>
      <Header as="h1">Web Ring Management Interface</Header>
      <ConfigEditor />
      <RingViewer />
    </>
  );
}
