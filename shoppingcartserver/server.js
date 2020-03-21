const express = require("express");
const { ApolloServer, gql } = require( "apollo-server-express");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");
const db = require("./models");

const server = new ApolloServer({
  typeDefs: gql(typeDefs),
  resolvers,
  context: { db }
});

const app = express();
server.applyMiddleware({ app });

app.use(express.static("app/public"));

db.sequelize.sync().then(() => {
  app.listen({ port: 4000 }, () =>
    console.log(`Server ready at http://localhost:4000/graphql`)
  );
});