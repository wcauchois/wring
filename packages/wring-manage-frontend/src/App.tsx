import React, { useState, useEffect } from 'react';
import { Header, Form, List, Segment, Container, Icon, Input } from 'semantic-ui-react';
import { WebRingConfig } from '@wcauchois/wring-schema';
import axios from "axios";
import validator from "validator";
import { useDebounce } from "use-debounce";

const styles = require("./App.module.scss");

async function validateSiteHasWebRing(url: string) {
  if (!validator.isURL(url)) {
    throw new Error(`Invalid URL`);
  }
  let data: any;
  try {
    const response = await axios.get(url);
    data = response.data;
  } catch (err) {
    throw new Error(`Error retrieving web ring config: ${err.message}`);
  }
  // TODO: Validate schema
}

function SiteInput() {
  const [value, setValue] = useState("");
  const [debouncedValue] = useDebounce(value, 1000);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function doValidation() {
      setLoading(true);
      try {
        await validateSiteHasWebRing(debouncedValue);
        setSuccess(true);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    setError(undefined);
    setSuccess(false);
    setLoading(false);

    if (debouncedValue.length > 0) {
      doValidation();
    }
  }, [debouncedValue]);

  return (
    <Form.Input
      type="text"
      value={value}
      onChange={e => setValue(e.currentTarget.value)}
      loading={loading}
      error={error}
      icon={success ? "check" : undefined} />
  );
}

function ConfigForm() {
  return (
    <Form>
      <Form.Field>
        <label>Site Name</label>
        <Form.Input type="text" />
      </Form.Field>
      <Form.Field>
        <label>Previous Site in the Web Ring</label>
        <SiteInput />
      </Form.Field>
      <Form.Field>
        <label>Next Site in the Web Ring</label>
        <SiteInput />
      </Form.Field>
    </Form>
  )
}

function CurrentConfig() {
  return (
    <Container>
      <ConfigForm />
    </Container>
  );
}

function App() {
  return (
    <div className={styles.main}>
      <Header as="h1">
        Web Ring Management Interface
      </Header>
      <CurrentConfig />
    </div>
  );
}

export default App;
