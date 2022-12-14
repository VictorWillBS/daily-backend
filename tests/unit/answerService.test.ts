import answerService from "../../src/services/answerService";
import answerFactory from "../factory/unit/answerFactory";
import answerRepository from "../../src/repositories/answerRepository";
import commonFactory from "../factory/unit/commonFactory";
import * as generateDate from "../../src/utils/generateDate";

beforeEach(() => {
  jest.resetAllMocks();
});

describe("Insert Answer", () => {
  it("Must Insert answer", async () => {
    const answer = answerFactory.allowAnswer();
    const resultExpected = { ...answer, id: 1, date: "2022-01-01" };
    jest
      .spyOn(answerRepository, "getQuestionById")
      .mockResolvedValueOnce(answerFactory.question());
    jest.spyOn(generateDate, "default").mockImplementationOnce((): any => {
      "2022-01-01";
    });
    jest
      .spyOn(answerRepository, "getAnswerbyDateAndQuestionId")
      .mockImplementationOnce((): any => {});
    jest.spyOn(answerRepository, "insert").mockImplementationOnce((): any => {
      return resultExpected;
    });
    const result = await answerService.insertAnswer(
      answer,
      commonFactory.randomNumber()
    );
    expect(result).toStrictEqual(resultExpected);
    expect(answerRepository.getQuestionById).toBeCalled();
    expect(answerRepository.getAnswerbyDateAndQuestionId).toBeCalled();
    expect(answerRepository.insert).toBeCalled();
    expect(generateDate.default).toBeCalled();
  });
  it("Must Return Not Found, NonExistent Question", () => {
    const answer = answerFactory.allowAnswer();
    jest.spyOn(answerRepository, "getQuestionById").mockResolvedValue(null);
    const result = answerService.insertAnswer(
      answer,
      commonFactory.randomNumber()
    );
    expect(result).rejects.toStrictEqual({
      code: "Not Found",
      message: "Question No Found",
    });
    expect(answerRepository.getQuestionById).toBeCalled();
  });

  it("Must Return Conflict, Question already answered", async () => {
    const answer = answerFactory.allowAnswer();
    jest
      .spyOn(answerRepository, "getQuestionById")
      .mockResolvedValueOnce(answerFactory.question());

    jest.spyOn(generateDate, "default").mockImplementationOnce((): any => {
      "2022-01-01";
    });

    jest
      .spyOn(answerRepository, "getAnswerbyDateAndQuestionId")
      .mockResolvedValueOnce({ ...answer, id: 1, date: "2022-01-01" });
    const result = answerService.insertAnswer(
      answer,
      commonFactory.randomNumber()
    );
    expect(result).rejects.toStrictEqual({
      code: "Conflict",
      message: "Question Already Answered Today.",
    });
  });
});
