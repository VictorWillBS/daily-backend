import { Fellings } from "@prisma/client";

export type CreateFelling = Omit<Fellings, "id">;
