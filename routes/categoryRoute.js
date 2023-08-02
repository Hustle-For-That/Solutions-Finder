const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");

router
    .route("/")
    .get(categoryController.getCategories)
    .post(categoryController.createCategory);

router
    .route("/:id")
    .get(categoryController.getCategoryById)
    .delete(categoryController.deleteCategory);

router.patch("/update", categoryController.updateCategory);

module.exports = router;