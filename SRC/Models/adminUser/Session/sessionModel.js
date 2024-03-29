import sessionSchema from "./sessionSchema.js";

export const insertSession = (obj) => {
  return sessionSchema(obj).save();
};

export const getSession = (filter) => {
  return sessionSchema.find(filter);
};
export const deleteSession = (filter) => {
  return sessionSchema.findOneAndDelete(filter);
};
