import { Answer } from "@prisma/client";

export type CreateAnswer = Omit<Answer, "id" | "date">;
