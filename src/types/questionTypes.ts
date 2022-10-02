import { Questions } from "@prisma/client";

export type CreateQuestion = Pick<Questions, "question">;
