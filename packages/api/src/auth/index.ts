import jwt from "jsonwebtoken";
import { IToken, ITokenGen, token_type } from "../types/auth";
import { IUser } from "../types/models";
import { Request, Response, NextFunction } from "express";
import { redis } from "../server";
import { randomBytes } from "crypto";

export const generate_token = (
  type: token_type,
  id: IUser["_id"]
): ITokenGen => {
  const secret: jwt.Secret =
    (type === "access"
      ? process.env.ACCESS_TOKEN_SECRET
      : process.env.REFRESH_TOKEN_SECRET) || "secret";

  const signed_token = jwt.sign(
    {
      type: type,
      id: id,
    },
    secret,
    type === "access" ? { expiresIn: "30s" } : {}
  );

  const exp = new Date();

  exp.setUTCSeconds(exp.getUTCSeconds() + 15);

  const new_token: ITokenGen = {
    token: signed_token,
    expires: exp,
  };

  return new_token;
};

export const authenticate_token = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      error: "Token not found",
    });
  }

  return jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET || "secret not found",
    (err, payload) => {
      if (err) {
        return res.status(401).json({
          error: "Unauthorized",
        });
      }

      const token = payload as IToken;

      if (token.type !== "access") {
        return res.status(401).json({
          error: "Unauthorized",
        });
      }

      res.locals.uid = token.id;

      return next();
    }
  );
};

export const save_token = async (token: ITokenGen, id: IUser["_id"]) => {
  return await redis.set(
    token.token,
    `${id}_${token.expires.valueOf()}_${randomBytes(5).toString("hex")}`
  );
};
