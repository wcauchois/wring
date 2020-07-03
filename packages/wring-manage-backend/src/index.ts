import { ApolloServer, gql } from "apollo-server";

const typeDefs = gql`
  type Query {
    hi: String
  }
`;

const resolvers = {
  Query: {
    hi: () => "hi!!"
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
