import main from 'async-main';
import { compile } from 'json-schema-to-typescript';
import path = require('path');
import fs = require('fs');
import { schema } from '../src/schema';

main(async () => {
  const result = await compile(schema, schema.title!);
  const outFilename = path.resolve(__dirname, '../src/schema-type.ts');
  fs.writeFileSync(outFilename, result);
});
