import fellingFactory from "../factory/unit/fellingFactory";
import fellingService from "../../src/services/fellingService";
import fellingRepository from "../../src/repositories/fellingRepository";
import * as generateDate from "../../src/utils/generateDate";
import commonFactory from "../factory/unit/commonFactory";

beforeEach(() => {
  jest.resetAllMocks();
});

describe("Insert Felling Test", () => {
  it("Must Insert Felling", async () => {
    const felling = fellingFactory.allowFelling();
    const userId = commonFactory.randomNumber();
    const resultExpected = { ...felling, id: 1 };
    jest
      .spyOn(fellingRepository, "getByDay")
      .mockImplementationOnce((): any => {
        return [];
      });
    jest
      .spyOn(fellingRepository, "insert")
      .mockResolvedValueOnce(resultExpected);

    const result = await fellingService.createFelling(felling, userId);

    expect(result).toStrictEqual(resultExpected);
    expect(fellingRepository.getByDay).toBeCalled();
    expect(fellingRepository.insert).toBeCalled();
  });

  it("Must Returm Conflict, Felling Already Inserted Today", () => {
    const felling = fellingFactory.allowFelling();
    const userId = commonFactory.randomNumber();
    jest
      .spyOn(fellingRepository, "getByDay")
      .mockResolvedValueOnce([{ ...felling, id: 1 }]);
    const result = fellingService.createFelling(felling, userId);
    expect(result).rejects.toStrictEqual({
      code: "Conflict",
      message: "Felling Already Exist.",
    });
    expect(fellingRepository.getByDay).toBeCalled();
    expect(fellingRepository.insert).not.toHaveBeenCalled();
  });
});

describe("Get Day Felling", () => {
  it("Must get Today Felling", async () => {
    const felling = fellingFactory.allowFelling();
    const userId = commonFactory.randomNumber();
    const resultExpected = { ...felling, id: 1 };
    jest
      .spyOn(generateDate, "default")
      .mockImplementationOnce(() => "2022-10-10");
    jest
      .spyOn(fellingRepository, "getByDay")
      .mockResolvedValueOnce([resultExpected]);

    const result = await fellingService.getFellingToday("", userId);

    expect(result).toStrictEqual([resultExpected]);
    expect(fellingRepository.getByDay).toBeCalled();
    expect(generateDate.default).toBeCalled();
  });
  it("Must get a specfic Day Felling", async () => {
    const felling = fellingFactory.allowFelling();
    const userId = commonFactory.randomNumber();
    const resultExpected = { ...felling, id: 1 };
    const day = "2022-10-10";
    jest
      .spyOn(fellingRepository, "getByDay")
      .mockResolvedValueOnce([resultExpected]);

    const result = await fellingService.getFellingToday(day, userId);

    expect(result).toStrictEqual([resultExpected]);
    expect(fellingRepository.getByDay).toBeCalled();
    expect(generateDate.default).not.toHaveBeenCalled();
  });
});
