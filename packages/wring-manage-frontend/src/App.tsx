import React from "react";
import { ApolloProvider } from "@apollo/react-hooks";
import { client } from "./lib/client";
import Home from "./components/Home";

const styles = require("./App.module.scss");

function App() {
  return (
    <div className={styles.main}>
      <ApolloProvider client={client}>
        <Home />
      </ApolloProvider>
    </div>
  );
}

export default App;
