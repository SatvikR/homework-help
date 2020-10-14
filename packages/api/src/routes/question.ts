import express from "express";
import { authenticate_token } from "../auth";
import Question from "../models/Question";
import { IQuestion, Search, Subject } from "../types/models";
import User from "../models/User";
import { IUserQuery } from "../types/query";

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

    const u_ids: IQuestion["author"][] = questions.map((e) => e.author);

    const authors: IUserQuery[] = await User.find(
      { _id: { $in: u_ids } },
      { username: 1 }
    );

    const response = questions.map((q) => {
      const author = authors.find(
        (a) => a._id.toString() === q.author.toString()
      );

      return {
        author: author,
        question: q,
      };
    });

    return res.json(response);
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
      return res.status(404).json({ error: "Question not found" });
    }

    const author: IUserQuery | null = await User.findById(
      target_question.author,
      {
        username: 1,
      }
    );

    if (!target_question) {
      return res.status(404).json({
        error: "Question not found",
      });
    }

    return res.json({
      author: author,
      question: target_question,
    });
  } catch {
    return res.status(500).json({
      error: "Internal server error",
    });
  }
});

router.route("/search").get(async (req, res) => {
  try {
    const search = req.query.search?.toString();
    const subject = req.query.subject?.toString();

    const query: Search = {};

    if (search) {
      query["title"] = { $regex: new RegExp(`${search}`) };
    }

    if (subject) {
      query["subject"] = subject as Subject;
    }

    const questions = await Question.find(query);

    const u_ids: IQuestion["author"][] = questions.map((e) => e.author);

    const authors: IUserQuery[] = await User.find(
      { _id: { $in: u_ids } },
      { username: 1 }
    );

    const response = questions.map((q) => {
      const author = authors.find(
        (a) => a._id.toString() === q.author.toString()
      );

      return {
        author: author,
        question: q,
      };
    });

    return res.json(response);
  } catch {
    return res.status(500).json({
      error: "Internal server error",
    });
  }
});

router.route("/edit").patch(authenticate_token, async (req, res) => {
  try {
    const subject: IQuestion["subject"] = req.body.subject;
    const title: IQuestion["title"] = req.body.title;
    const description: IQuestion["description"] = req.body.description;
    const id: IQuestion["_id"] = req.body.id;
    const image: IQuestion["image"] = req.body.image;

    if (!(subject && title && description && id)) {
      return res.status(403).json({
        error: "Missing fields",
      });
    }

    const target_question = await Question.findById(id);

    if (!target_question) {
      return res.status(404).json({
        error: "Question not found",
      });
    }

    target_question.subject = subject;
    target_question.title = title;
    target_question.description = description;
    target_question.image = image;

    await target_question.save();

    return res.json(target_question);
  } catch {
    return res.status(500).json({
      error: "Internal server error",
    });
  }
});

router.route("/delete").delete(authenticate_token, async (req, res) => {
  try {
    const id: IQuestion["_id"] = req.body.id;

    await Question.findByIdAndDelete(id);

    return res.json({
      message: "Question deleted",
    });
  } catch {
    return res.status(500).json({
      error: "Internal server error",
    });
  }
});

export default router;
