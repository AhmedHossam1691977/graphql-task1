import { CourseModel } from "../../db/models/Course .model.js";

export default {
  Query: {
    courses: async () => await CourseModel.find().populate("students"),
    course: async (_, { id }) => await CourseModel.findById(id).populate("students"),
  },

  Mutation: {
    addCourse: async (_, { title, code, credits, instructor }) => {
      const newCourse = new CourseModel({ title, code, credits, instructor });
      await newCourse.save();
      return newCourse;
    },
  },
};
