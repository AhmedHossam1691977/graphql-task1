import { gql } from "apollo-server-express";

const courseTypeDef = gql`
  type Course {
    id: ID!
    title: String!
    code: String!
    credits: Int!
    instructor: String!
    students: [Student]
  }

  type Query {
    courses: [Course]
    course(id: ID!): Course
  }

  type Mutation {
    addCourse(title: String!, code: String!, credits: Int!, instructor: String!): Course
  }
`;

export default courseTypeDef;
