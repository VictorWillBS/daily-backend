import { Users } from "@prisma/client";

export type CreateUser = Omit<Users, "id">;
export type Login = Omit<Users, "id" | "photo" | "name">;

export interface IUserJson {
  id: String;
  name: String;
}
