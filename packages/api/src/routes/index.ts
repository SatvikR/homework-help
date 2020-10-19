import express from "express";
import user_router from "./user";
import token_router from "./token";
import question_router from "./question";
import answer_router from "./answer";
import image_router from "./image";

const router = express.Router();

router.use("/user", user_router);
router.use("/token", token_router);
router.use("/question", question_router);
router.use("/answer", answer_router);
router.use("/image", image_router);

export default router;
