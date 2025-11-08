import { gql } from "apollo-server-express";

const userTypeDef = gql`
  type User {
    id: ID!
    email: String!
    password: String!
  }

  type Mutation {
    register(email: String!, password: String!): String
    login(email: String!, password: String!): String
  }
`;

export default userTypeDef;
