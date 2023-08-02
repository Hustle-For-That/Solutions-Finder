const express = require("express");
const router = express.Router();
const questionController = require("../controllers/questionsController");

router
    .route("/")
    .get(questionController.getQuestions)
    .post(questionController.createQuestion);

router
    .route("/:id")
    .get(questionController.getSingleQuestion)
    .delete(questionController.deleteQuestion);

router.patch("/update", questionController.updateQuestion);

module.exports = router;
