import { schema } from "./schema";
import { WebRingConfig } from "./schema-type";
import { validateWebRingConfig, ConfigValidationError } from "./validate";

export {
  WebRingConfig,
  validateWebRingConfig,
  ConfigValidationError
};

export const webRingSchema = schema;
