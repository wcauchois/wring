import Ajv from "ajv";
import { schema } from "./schema";
import { WebRingConfig } from "./schema-type";

const ajv = new Ajv();
const validate = ajv.compile(schema);

export class ConfigValidationError extends Error {
  readonly errors: Ajv.ErrorObject[];

  constructor(errors: Ajv.ErrorObject[]) {
    super(`Error(s) validating web ring config: ${errors.map(e => e.message).join(', ')}`);
    this.errors = errors;
  }
}

/**
 * Validate the input configuration. If invalid, throws a `ConfigValidationError`.
 */
export function validateWebRingConfig(input: object): asserts input is WebRingConfig {
  const isValid = validate(input);
  if (!isValid) {
    throw new ConfigValidationError(validate.errors ? [...validate.errors] : []);
  }
}

export function isValidWebRingConfig(input: object): input is WebRingConfig {
  return validate(input) as boolean;
}
