import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  status: {
    type: String,
    default: "inactive",
  },
  name: {
    type: String,
    require: true,
  },
  slug: {
    type: String,
    unique: true,
    index: 1,
    require: true,
    trim: true,
  },
  parentId: {
    type: mongoose.Schema.Types.ObjectId,
    default: null,
  },
});

export default mongoose.model("category", categorySchema);
