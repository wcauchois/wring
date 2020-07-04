import React, { useState, useEffect, useRef } from "react";
import { Form } from "semantic-ui-react";
import { useDebounce } from "use-debounce";
import { fetchSiteConfig, configUrlForSite } from "../lib/utils";

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
        await fetchSiteConfig(configUrlForSite(debouncedValue));
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
