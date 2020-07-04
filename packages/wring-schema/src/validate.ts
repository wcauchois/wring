import Ajv from "ajv";
import { schema } from "./schema";

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
export function validateWebRingConfig(input: object) {
  const isValid = validate(input);
  if (!isValid) {
    throw new ConfigValidationError(validate.errors ? [...validate.errors] : []);
  }
}
