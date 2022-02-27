import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name required"],
  },
  lastName: {
    type: String,
    required: [true, "Lastname required"],
  },
  email: {
    type: String,
    required: [true, "Email required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password required"],
  },
});

UserSchema.methods.toJSON = function () {
  const { __v, ...data } = this.toObject();
  return data;
};

export default mongoose.model("User", UserSchema);
