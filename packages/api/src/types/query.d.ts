import { IUser } from "./models";

export interface IUserQuery {
  _id: IUser["_id"];
  username: IUser["username"];
}
