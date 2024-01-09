import express from "express";
import {
  getAllCategory,
  getCategoryById,
  insertCategory,
} from "../Category/categoryModel.js";
const router = express.Router();
import slugify from "slugify";

// Get category
router.get("/:_id?", async (req, res, next) => {
  try {
    const { _id } = req.params;
    const categories = _id
      ? await getCategoryById(_id)
      : await getAllCategory();

    res.json({
      status: "success",
      message: "category list has been fetched",
      categories,
    });
  } catch (error) {
    error.status = 500;
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    req.body.slug = slugify(req.body.name, {
      lower: true,
      trim: true,
    });

    const result = await insertCategory(req.body);

    result?._id
      ? res.json({
          status: "success",
          message: "New Category has been added",
        })
      : res.json({
          status: "error",
          message: "Unable to add the category, please try again later",
        });
  } catch (error) {
    next(error);
  }
});

export default router;
