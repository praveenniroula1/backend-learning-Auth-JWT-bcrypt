import { verifyAccessJWT } from "../SRC/Helpers/jwtHelpers.js";
import { findOneAdminUser } from "../SRC/Models/adminUser/AdminUserModel.js";
import { getSession } from "../SRC/Models/adminUser/Session/sessionModel.js";

export const adminAuth = async (req, res, next) => {
  try {
    const { authorizaton } = req.headers;
    if (authorizaton) {
      const decoded = await verifyAccessJWT(authorizaton);
      if (decoded === "jwt expired") {
        return res.status(403).json({
          status: "error",
          message: "jwt expired",
        });
      }

      if (decoded?.email) {
        const existInDb = await getSession({
          type: "jwt",
          token: authorizaton,
        });

        if (existInDb?._id) {
          const adminInfo = await findOneAdminUser({ email: decoded.email });
          if (adminInfo?._id) {
            req.adminInfo = adminInfo;
            return next();
          }
        }
      }
    }

    res.status(401).json({
      status: "error",
      message: "Unauthorized",
    });
  } catch (error) {
    error.status = 500;
    next(error);
  }
};
