import React from 'react';
import { Header } from 'semantic-ui-react';

const styles = require("./App.module.scss");

function App() {
  return (
    <div className={styles.main}>
      <Header as="h1">
        Web Ring Management Interface
      </Header>
    </div>
  );
}

export default App;
