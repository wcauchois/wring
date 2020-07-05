import { ApolloServer, gql } from "apollo-server-express";
import findRoot from "find-root";
import fs = require('fs');
import path = require('path');
import { GraphQLJSON } from 'graphql-scalars';
import axios from 'axios';
import cheerio = require('cheerio');
import frontend = require('@wcauchois/wring-manage-frontend');
import express = require('express');

const packageDirectory = findRoot(process.cwd());
const configName = `web-ring.json`;
const configPath = path.join(packageDirectory, configName);
const publicDir = frontend.getPublicDir();

const typeDefs = gql`
  scalar JSON

  type WebRingConfig {
    id: ID!
    data: JSON!
  }

  type Query {
    config: WebRingConfig
    websiteTitle(url: String!): String!
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
    config: () => WebRingConfig.fromFile(configPath),

    async websiteTitle(_query: any, { url }: { url: string }) {
      const response = await axios.get(url, { responseType: "text" });
      const html = response.data;
      const $ = cheerio.load(html);
      // Partly cribbed from: https://github.com/sindresorhus/article-title/blob/49984d2cda89167fc529e06d43bc91b04f9b05b0/index.js#L39
      return $('title').text().replace(/\r?\n/g, '');
    }
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
  resolvers,
});

const app = express();
server.applyMiddleware({ app });
app.use(express.static(publicDir));

const DEFAULT_PORT = 4667;
const port = process.env.PORT ? parseInt(process.env.PORT) : DEFAULT_PORT;

app.listen(port, () => {
  console.log(`Server ready`);
});
