import { gql } from "apollo-server-express";

const studentTypeDef = gql`
  type Student {
    id: ID!
    name: String!
    email: String!
    age: Int!
    major: String
    courses: [Course]
  }

  type Query {
    students: [Student]
    student(id: ID!): Student
  }

  type Mutation {
    addStudent(name: String!, email: String!, age: Int!, major: String): Student
    deleteStudent(id: ID!): String
  }
`;

export default studentTypeDef;
