import { JSONSchema4 } from "json-schema";

export const schema: JSONSchema4 = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  title: 'WebRingConfig',
  type: 'object',
  properties: {
    name: { type: 'string' },
    next: {
      type: 'array',
      items: { $ref: '#/definitions/SiteConfig' }
    },
    prev: {
      type: 'array',
      items: { $ref: '#/definitions/SiteConfig' }
    },
  },
  required: ["name", "next", "prev"],
  additionalProperties: false,
  definitions: {
    SiteConfig: {
      title: 'SiteConfig',
      type: 'object',
      properties: {
        site: { type: 'string' }
      },
      required: ['site'],
      additionalProperties: false
    }
  }
};
