import express from "express";
import { ApolloServer } from "apollo-server-express";
import typeDefs from "./src/typeDefs/index.js";
import resolvers from "./src/resolvers/index.js";
import connectionDB from "./db/db.conection.js";
import { getUserFromToken } from "./src/utils/jwt.js";


async function startServer() {
  const app = express();
  const port = 3000;

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
      const token = req.headers.authorization?.split(" ")[1];
      const user = getUserFromToken(token);
      return { user };
    },
  });

  await server.start();
  server.applyMiddleware({ app, path: "/graphql" });

  await connectionDB();

  app.listen(port, () =>
    console.log(`Server running on http://localhost:${port}/graphql`)
  );
}

startServer();
