import "dotenv/config";
import express from "express";
import cors from "cors";
const app = express();

// DB Connection
import dbConnection from "./SRC/Config/dbConfig.js";
dbConnection();

// middlewares
app.use(cors());
app.use(express.json());

// APIS
import adminUserRouter from "./SRC/Routers/adminUserRouter.js";
import categoryRouter from "./SRC/Routers/categoryRouter.js";
import { adminAuth } from "./Auth-Middleware/authMiddleware.js";
app.use("/api/v1/admin-user", adminUserRouter);
app.use("/api/v1/category", adminAuth, categoryRouter);

// global error handler
app.use((error, req, res, next) => {
  console.log(error);
  const statusCode = error.status || 404; // Use 500 as a default status code for server errors
  res.status(statusCode).json({
    status: "error",
    message: error.message,
  });
});

// listening the port
const port = 8000;
app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
