import React, { useState, useEffect } from "react";
import { Form, Segment, Message, Button } from "semantic-ui-react";
import { isValidWebRingConfig, WebRingConfig } from "@wcauchois/wring-schema";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { uniqueId } from "../lib/utils";
import SiteInput from "./SiteInput";
import { writeConfigMutation, configQuery } from "../lib/queries";

interface ConfigValues {
  name: string;
  prev: string;
  next: string;
}

function valuesToConfig(values: ConfigValues): WebRingConfig {
  return {
    name: values.name,
    next: [
      {
        site: values.next,
      },
    ],
    prev: [
      {
        site: values.prev,
      },
    ],
  };
}

const emptyConfigValues: ConfigValues = {
  name: "",
  prev: "",
  next: "",
};

interface ConfigFormProps {
  initialValues: ConfigValues;
  onSubmit(values: ConfigValues): void;
}

function ConfigForm({ initialValues, onSubmit }: ConfigFormProps) {
  const [name, setName] = useState(initialValues.name);
  const [prev, setPrev] = useState(initialValues.prev);
  const [next, setNext] = useState(initialValues.next);

  return (
    <Form
      onSubmit={() => {
        onSubmit({
          name,
          prev,
          next,
        });
      }}
    >
      <Form.Field>
        <label>Site Name</label>
        <Form.Input
          type="text"
          value={name}
          onChange={(e) => setName(e.currentTarget.value)}
        />
      </Form.Field>
      <Form.Field>
        <label>Previous Site in the Web Ring</label>
        <SiteInput value={prev} onChange={(x) => setPrev(x)} />
      </Form.Field>
      <Form.Field>
        <label>Next Site in the Web Ring</label>
        <SiteInput value={next} onChange={(x) => setNext(x)} />
      </Form.Field>
      <Button type="submit">Save</Button>
      <Button
        basic
        onClick={() => {
          setName(initialValues.name);
          setPrev(initialValues.prev);
          setNext(initialValues.next);
        }}
      >
        Reset
      </Button>
    </Form>
  );
}

interface ConfigFormContainerProps {
  config: { data: any } | null;
}

function ConfigFormContainer({ config }: ConfigFormContainerProps) {
  const [key, setKey] = useState("initial");
  const [configValid, setConfigValid] = useState(
    () => !!config && isValidWebRingConfig(config.data)
  );

  useEffect(() => {
    setKey(uniqueId()); // Force re-mount
    setConfigValid(!!config && isValidWebRingConfig(config.data));
  }, [config]);

  const [writeConfig] = useMutation(writeConfigMutation);

  return (
    <>
      {config && !configValid && (
        <Message warning>
          A web-ring.json file was detected, but did not validate. Please enter
          new values.
        </Message>
      )}
      <ConfigForm
        key={key}
        initialValues={
          config && configValid
            ? {
                name: config.data.name,
                prev:
                  config.data.prev.length > 0 ? config.data.prev[0].site : "",
                next:
                  config.data.next.length > 0 ? config.data.next[0].site : "",
              }
            : emptyConfigValues
        }
        onSubmit={(values) => {
          writeConfig({
            variables: {
              data: valuesToConfig(values),
            },
          }).catch((err) => {
            console.error(err.message);
          });
        }}
      />
    </>
  );
}

function GetStarted({ onClick }: { onClick: () => void }) {
  return (
    <>
      <p>It looks like you don't have a web ring config yet.</p>
      <Button size="large" onClick={onClick}>
        Get Started
      </Button>
    </>
  );
}

function ConfigEditorMain({ data }: { data: any }) {
  const { config } = data;
  const [gotStarted, setGotStarted] = useState(false);
  return config || gotStarted ? (
    <ConfigFormContainer config={config} />
  ) : (
    <GetStarted onClick={() => setGotStarted(true)} />
  );
}

export default function ConfigEditor() {
  const { loading, error, data } = useQuery(configQuery);

  return (
    <Segment loading={loading} style={{ minHeight: "100px" }}>
      {error && <Message error>{error.message}</Message>}
      {data && <ConfigEditorMain data={data} />}
    </Segment>
  );
}
