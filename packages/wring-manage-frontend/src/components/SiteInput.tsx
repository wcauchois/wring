import React, { useState, useEffect, useRef } from "react";
import { Form } from "semantic-ui-react";
import { validateWebRingConfig } from "@wcauchois/wring-schema";
import axios from "axios";
import { useDebounce } from "use-debounce";

async function validateSite(url: string) {
  let parsedUrl: URL;
  try {
    parsedUrl = new URL(url);
  } catch (err) {
    throw new Error(`Invalid URL`);
  }
  const configUrl = `${parsedUrl.origin}/web-ring.json`;
  let data: any;
  try {
    const response = await axios.get(configUrl);
    data = response.data;
  } catch (err) {
    throw new Error(`Error retrieving web ring config: ${err.message}`);
  }
  validateWebRingConfig(data);
}

interface SiteInputProps {
  value: string;
  onChange(newValue: string): void;
}

export default function SiteInput({ value, onChange }: SiteInputProps) {
  const [debouncedValue] = useDebounce(value, 1000);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  const mounted = useRef(true);
  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  });

  useEffect(() => {
    async function doValidation() {
      setLoading(true);
      try {
        await validateSite(debouncedValue);
        if (mounted.current) {
          setSuccess(true);
        }
      } catch (err) {
        if (mounted.current) {
          setError(err.message);
        }
      } finally {
        if (mounted.current) {
          setLoading(false);
        }
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
      onChange={(e) => onChange(e.currentTarget.value)}
      loading={loading}
      error={error}
      icon={success ? "check" : undefined}
    />
  );
}
