import express from "express";
import {
  getAllCategory,
  getCategoryById,
  hasChildCatById,
  insertCategory,
  updateCatById,
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

// update category
router.put("/", async (req, res, next) => {
  try {
    const hasChildCats = await hasChildCatById(req.body._id);
    if (hasChildCatById) {
      return res.json({
        status: "error",
        message: "This has got a child category",
      });
    }
    const catUpdate = await updateCatById(req.body);
    catUpdate?._id
      ? res.json({
          status: "success",
          message: " Category has been Updated",
        })
      : res.json({
          status: "error",
          message: "Unable to Edit the category, please try again later",
        });
  } catch (error) {
    next(error);
  }
});

export default router;
