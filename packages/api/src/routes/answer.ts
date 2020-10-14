import express from "express";
import { authenticate_token } from "../auth";
import Answer from "../models/Answer";
import User from "../models/User";
import { IAnswer } from "../types/models";
import { IUserQuery } from "../types/query";

const router = express.Router();

router.route("/create").post(authenticate_token, async (req, res) => {
  try {
    const question: IAnswer["question"] | null = req.body.question;
    const author: IAnswer["author"] | null = res.locals.uid;
    const answer: IAnswer["answer"] | null = req.body.answer;

    if (!(question && author && answer)) {
      return res.status(402).json({
        error: "Missing fields",
      });
    }

    const new_answer = new Answer({
      question: question,
      author: author,
      answer: answer,
    });

    await new_answer.save();

    return res.json(new_answer);
  } catch {
    return res.status(500).json({
      error: "Internal server error",
    });
  }
});

router.route("/get").get(async (req, res) => {
  try {
    const question: IAnswer["question"] | null = req.query.question?.toString();

    if (!question) {
      return res.status(402).json({
        error: "Missing fields",
      });
    }

    const answers = await Answer.find({ question: question });

    const u_ids: IAnswer["author"][] = answers.map((e) => e.author);

    const authors: IUserQuery[] = await User.find(
      { _id: { $in: u_ids } },
      { username: 1 }
    );

    const response = answers.map((e) => {
      const author = authors.find(
        (a) => a._id.toString() === e.author.toString()
      );

      return {
        author: author,
        answer: e,
      };
    });

    return res.json(response);
  } catch {
    return res.status(500).json({
      error: "Internal server error",
    });
  }
});

router.route("/validate").patch(authenticate_token, async (req, res) => {
  try {
    const answer: IAnswer["_id"] = req.body.id;

    if (!answer) {
      return res.status(402).json({
        error: "Missing fields",
      });
    }

    const target_answer = await Answer.findById(answer);

    if (!target_answer) {
      return res.status(404).json({
        error: "Answer not found",
      });
    }

    target_answer.valid = true;

    await target_answer.save();

    return res.json(target_answer);
  } catch {
    return res.status(500).json({
      error: "Internal server error",
    });
  }
});

export default router;
