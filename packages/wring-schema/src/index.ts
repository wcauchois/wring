import { schema } from "./schema";
import { WebRingConfig } from "./schema-type";
import { isValidWebRingConfig, validateWebRingConfig, ConfigValidationError } from "./validate";

export {
  WebRingConfig,
  validateWebRingConfig,
  isValidWebRingConfig,
  ConfigValidationError
};

export const webRingSchema = schema;
