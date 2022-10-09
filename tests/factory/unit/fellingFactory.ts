import { faker } from "@faker-js/faker";
import { Felling } from "@prisma/client";

function allowFelling() {
  const felling = "Triste" as Felling;
  return {
    day: "2022-10-10",
    felling,
    userId: faker.datatype.number(),
  };
}

export default { allowFelling };
