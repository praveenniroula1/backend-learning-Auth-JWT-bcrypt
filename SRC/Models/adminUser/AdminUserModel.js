import AdminUserSchema from "./AdminUserSchema.js";

export const insertAdminUser = (obj) => {
  return AdminUserSchema(obj).save();
};

export const updateOneAdminUser = (filter, update) => {
  return AdminUserSchema.findOneAndUpdate(filter, update, { new: true });
};
