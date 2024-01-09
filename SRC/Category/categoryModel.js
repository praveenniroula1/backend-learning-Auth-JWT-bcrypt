import categorySchema from "./categorySchema.js";

export const insertCategory = (obj) => {
  return categorySchema(obj).save();
};

export const getAllCategory = () => {
  return categorySchema.find();
};

export const getCategoryById = (_id) => {
  return categorySchema.findById(_id);
};
