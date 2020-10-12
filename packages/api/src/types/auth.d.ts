import { IUser } from "./models";

export type token_type = "refresh" | "access";

export interface IToken {
  type: token_type;
  id: IUser["_id"];
}

export interface ITokenGen {
  token: string;
  expires: Date;
}
