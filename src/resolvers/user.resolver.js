import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { UserModel } from "../../db/models/User.model.js";

export default {
  Mutation: {
    register: async (_, { email, password }) => {
      const existingUser = await UserModel.findOne({ email });
      if (existingUser) throw new Error("User already exists");

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new UserModel({ email, password: hashedPassword });
      await user.save();
      return "User registered successfully";
    },

    login: async (_, { email, password }) => {
      const user = await UserModel.findOne({ email });
      if (!user) throw new Error("User not found");

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) throw new Error("Invalid credentials");

      return jwt.sign({ id: user._id, email: user.email }, "supersecret", {
        expiresIn: "7d",
      });
    },
  },
};
