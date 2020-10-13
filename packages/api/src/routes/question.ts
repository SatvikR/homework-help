import express from "express";
import { authenticate_token } from "../auth";
import Question from "../models/Question";
import { IQuestion } from "../types/models";

const router = express.Router();

router.route("/create").post(authenticate_token, async (req, res) => {
  try {
    const author: IQuestion["author"] = res.locals.uid;
    const subject: IQuestion["subject"] = req.body.subject;
    const title: IQuestion["title"] = req.body.title;
    const description: IQuestion["description"] = req.body.description;
    const image: IQuestion["image"] = req.body.image;

    if (!(subject && title && description)) {
      return res.status(403).json({
        error: "Missing fields",
      });
    }

    const new_question = new Question({
      author,
      subject,
      title,
      description,
      image,
    });

    await new_question.save();

    return res.json(new_question);
  } catch {
    return res.status(500).json({
      error: "Internal server error",
    });
  }
});

router.route("/").get(async (req, res) => {
  try {
    const page = parseInt(req.query.page?.toString() || "0");
    const check_answered = req.query.check_answered;
    const page_len = 15;

    const questions = await Question.find(
      check_answered ? {} : { answered: false }
    )
      .sort({ createdAt: -1 })
      .skip(page * page_len)
      .limit(page_len);

    return res.json(questions);
  } catch {
    return res.status(500).json({
      error: "Internal server error",
    });
  }
});

router.route("/get").get(async (req, res) => {
  try {
    const id = req.query.id?.toString();

    if (!id) {
      return res.status(402).json({
        error: "No id",
      });
    }

    const target_question = await Question.findById(id);

    if (!target_question) {
      return res.status(404).json({
        error: "Question not found",
      });
    }

    return res.json(target_question);
  } catch {
    return res.status(500).json({
      error: "Internal server error",
    });
  }
});

export default router;
