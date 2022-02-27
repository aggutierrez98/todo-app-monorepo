import mongoose from "mongoose";

const TodosSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title required"],
      minLength: 6,
    },
    description: {
      type: String,
      required: [true, "Description required"],
      minLength: 10,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "UserId required"],
    },
    done: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

TodosSchema.methods.toJSON = function () {
  const { __v, ...data } = this.toObject();
  return data;
};

export default mongoose.model("Todo", TodosSchema);
