import { Users } from "@prisma/client";

export type CreateUser = Omit<Users, "id">;
