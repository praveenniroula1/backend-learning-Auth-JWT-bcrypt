import AdminUserSchema from "./AdminUserSchema.js";

export const insertAdminUser = (obj) => {
  return AdminUserSchema(obj).save();
};
