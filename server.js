import { ApolloServer, gql } from 'apollo-server-express'
import express from 'express';
import connectionDB from './db/db.conection.js'
import { CourseModel } from './db/models/Course .model.js';
import { StudentModel } from './db/models/Student .model.js';


const typeDefs = gql`
  type Student {
    id: ID!
    name: String!
    email: String!
    age: Int!
    major: String
    courses: [Course!]!
  }

  type Course {
    id: ID!
    title: String!
    code: String!
    credits: Int!
    instructor: String!
    students: [Student!]!
  }

  type Query {
    getAllStudents: [Student!]!
    getStudent(id: ID!): Student
    getAllCourses: [Course!]!
    getCourse(id: ID!): Course
  }

  type Mutation {
    addStudent(name: String!, email: String!, age: Int!, major: String): Student!
    updateStudent(id: ID!, name: String, email: String, age: Int, major: String): Student
    deleteStudent(id: ID!): Boolean!

    addCourse(title: String!, code: String!, credits: Int!, instructor: String!): Course!
    updateCourse(id: ID!, title: String, code: String, credits: Int, instructor: String): Course
    deleteCourse(id: ID!): Boolean!
  }
`;
const resolvers = {
     Query: {
    getAllStudents: async () => await StudentModel.find().populate('courses'),

    getStudent: async (_, { id }) => await StudentModel.findById(id).populate('courses'),

    getAllCourses: async () => await CourseModel.find().populate('students'),

    getCourse: async (_, { id }) => await CourseModel.findById(id).populate('students'),

  },
  Mutation: {
    addStudent: async (_, { name, email, age, major }) => {
      const newStudent = new StudentModel({ name, email, age, major });
      await newStudent.save();
      return newStudent;
    },

    updateStudent: async (_, { id, name, email, age, major }) => {
      const student = await StudentModel.findByIdAndUpdate(
        id,
        { name, email, age, major },
        { new: true }
      );
      return student;
    },

    deleteStudent: async (_, { id }) => {
      const result = await StudentModel.findByIdAndDelete(id);
      return !!result;
    },

    addCourse: async (_, { title, code, credits, instructor }) => {
      const newCourse = new CourseModel({ title, code, credits, instructor });
      await newCourse.save();
      return newCourse;
    },

    updateCourse: async (_, { id, title, code, credits, instructor }) => {
      const course = await CourseModel.findByIdAndUpdate(
        id,
        { title, code, credits, instructor },
        { new: true }
      );
      return course;
    },


    deleteCourse: async (_, { id }) => {
      const result = await CourseModel.findByIdAndDelete(id);
      return !!result;
    }
  },

  // Relations
  Student: {
    courses: async (parent) => {
      return await CourseModel.find({ _id: { $in: parent.courses } });
    }
  },

  Course: {
    students: async (parent) => {
      return await StudentModel.find({ _id: { $in: parent.students } });
    }
  }
};







async function start(){
    
    const app = express()
    const port = 3000

    const server =new ApolloServer({
        typeDefs,
        resolvers
    })

    await server.start()

    server.applyMiddleware({app, path: '/graphql'})
    connectionDB()

    app.listen(port, () => console.log(`Example app listening on port ${port}!`))
}
start()