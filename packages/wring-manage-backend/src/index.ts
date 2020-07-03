import { ApolloServer, gql } from "apollo-server";
import findRoot from "find-root";
import fs = require('fs');
import path = require('path');
import { GraphQLJSON } from 'graphql-scalars';

const packageDirectory = findRoot(process.cwd());
const configName = `web-ring.json`;
const configPath = path.join(packageDirectory, configName);

const typeDefs = gql`
  scalar JSON

  type WebRingConfig {
    id: ID!
    data: JSON!
  }

  type Query {
    config: WebRingConfig
  }

  type Mutation {
    writeConfig(data: JSON!): WebRingConfig!
  }
`;

class WebRingConfig {
  readonly data: any;

  constructor(data: any) {
    this.data = data;
  }

  get id() {
    return 'config';
  }

  static fromFile(path: string) {
    if (fs.existsSync(path)) {
      const config = JSON.parse(fs.readFileSync(path, { encoding: 'utf-8' }));
      return new WebRingConfig(config);
    } else {
      return null;
    }
  }

  write(path: string) {
    fs.writeFileSync(path, JSON.stringify(this.data, null, 2));
  }
}

const resolvers = {
  JSON: GraphQLJSON,

  Query: {
    config: () => WebRingConfig.fromFile(configPath)
  },

  Mutation: {
    writeConfig(_mutation: any, { data }: { data: any }) {
      const config = new WebRingConfig(data);
      config.write(configPath);
      return config;
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

const DEFAULT_PORT = 4667;
const port = process.env.PORT ? parseInt(process.env.PORT) : DEFAULT_PORT;

server.listen(port).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
