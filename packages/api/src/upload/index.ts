import aws from "aws-sdk";
import { randomBytes } from "crypto";
import multerS3 from "multer-s3";
import { Router } from "express";
import { upload } from "../server";

export const storage_engine = (s3: aws.S3) => {
  return multerS3({
    s3: s3,
    bucket: "homework-app",
    metadata: (_req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (_req, _file, cb) => {
      cb(
        null,
        "images/" +
          Date.now().toString() +
          randomBytes(16).toString("hex") +
          ".jpeg"
      );
    },
  });
};

export const setup_upload = (router: Router) => {
  router.route("/upload").post(upload.array("image", 1), async (req, res) => {
    try {
      return res.json(req.files);
    } catch {
      return res.status(500).json({
        error: "Internal server error",
      });
    }
  });
};
