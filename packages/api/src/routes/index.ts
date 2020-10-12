import express from "express";
import user_router from "./user";
import token_router from "./token";

const router = express.Router();

router.use("/user", user_router);
router.use("/token", token_router);

export default router;
