import express from "express";
import user_router from "./user";
import token_router from "./token";
import question_router from "./question";

const router = express.Router();

router.use("/user", user_router);
router.use("/token", token_router);
router.use("/question", question_router);

export default router;
