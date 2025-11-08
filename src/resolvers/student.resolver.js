import { StudentModel } from "../../db/models/Student .model.js";

export default {
  Query: {
    students: async () => await StudentModel.find().populate("courses"),
    student: async (_, { id }) => await StudentModel.findById(id).populate("courses"),
  },

  Mutation: {
    addStudent: async (_, { name, email, age, major }) => {
      const newStudent = new StudentModel({ name, email, age, major });
      await newStudent.save();
      return newStudent;
    },
    deleteStudent: async (_, { id }) => {
      await StudentModel.findByIdAndDelete(id);
      return "Student deleted successfully";
    },
  },
};
