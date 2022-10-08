import questionService from "../../src/services/questionService";
import questionRepository from "../../src/repositories/questionRepository";
import questionFactory from "../factory/questionFactory";
import commonFactory from "../factory/commonFactory";

beforeEach(() => {
  jest.resetAllMocks();
});

describe("Create Question Test", () => {
  it("Must Create New Question", async () => {
    const userId = commonFactory.randomNumber();
    const questionCreated = questionFactory.allowQuestion();
    const question = { question: questionCreated.question };
    const resultExpect = {
      id: questionCreated.id,
      question: question.question,
    };
    jest.spyOn(questionRepository, "getByQuestion").mockResolvedValueOnce(null);
    jest.spyOn(questionRepository, "getAllAble").mockResolvedValueOnce([]);
    jest.spyOn(questionRepository, "insert").mockImplementationOnce((): any => {
      return questionCreated;
    });
    jest.spyOn(questionRepository, "enableById").getMockImplementation();

    const result = await questionService.createQuestion(question, userId);

    expect(result).toStrictEqual(resultExpect);
    expect(questionRepository.getByQuestion).toBeCalled();
    expect(questionRepository.getAllAble).toBeCalled();
    expect(questionRepository.insert).toBeCalled();
    expect(questionRepository.enableById).not.toHaveBeenCalled();
  });
  it("Must Return Conflict, Already a Question With This Name", () => {
    const questionCreated = {
      ...questionFactory.allowQuestion(),
      isAble: true,
    };
    const question = { question: questionCreated.question };
    const userId = commonFactory.randomNumber();
    jest
      .spyOn(questionRepository, "getByQuestion")
      .mockResolvedValueOnce(questionCreated);
    jest.spyOn(questionRepository, "getAllAble").getMockImplementation();
    jest.spyOn(questionRepository, "enableById").getMockImplementation();
    jest.spyOn(questionRepository, "insert").getMockImplementation();
    const result = questionService.createQuestion(question, userId);
    expect(result).rejects.toStrictEqual({
      code: "Conflict",
      message: "Já existe uma pergunta com esse nome.",
    });
    expect(questionRepository.getByQuestion).toBeCalled();
    expect(questionRepository.getAllAble).not.toHaveBeenCalled();
    expect(questionRepository.enableById).not.toHaveBeenCalled();
    expect(questionRepository.insert).not.toHaveBeenCalled();
  });
  it("Must Return Bad Request, Try Create More Than 5 Questions", () => {
    const questionCreated = {
      ...questionFactory.allowQuestion(),
      isAble: false,
    };
    const question = { question: questionCreated.question };
    const userId = commonFactory.randomNumber();
    jest.spyOn(questionRepository, "getByQuestion").mockResolvedValueOnce(null);
    jest
      .spyOn(questionRepository, "getAllAble")
      .mockResolvedValueOnce([
        questionCreated,
        questionCreated,
        questionCreated,
        questionCreated,
        questionCreated,
      ]);
    jest.spyOn(questionRepository, "enableById");
    jest.spyOn(questionRepository, "insert");

    const result = questionService.createQuestion(question, userId);

    expect(result).rejects.toStrictEqual({
      code: "Bad Request",
      message: "Você deve ter no máximo 5 questões.",
    });
    expect(questionRepository.getByQuestion).toBeCalled();
  });
  it("Must Reable a Question", async () => {
    const questionCreated = {
      ...questionFactory.allowQuestion(),
      isAble: false,
    };
    const question = { question: questionCreated.question };
    const userId = commonFactory.randomNumber();
    const resultExpect = {
      id: questionCreated.id,
      question: questionCreated.question,
    };
    jest
      .spyOn(questionRepository, "getByQuestion")
      .mockResolvedValueOnce(questionCreated);
    jest.spyOn(questionRepository, "getAllAble").mockResolvedValueOnce([]);
    jest
      .spyOn(questionRepository, "enableById")
      .mockResolvedValueOnce(questionCreated);
    jest.spyOn(questionRepository, "insert");

    const result = await questionService.createQuestion(question, userId);

    expect(result).toStrictEqual(resultExpect);
    expect(questionRepository.getByQuestion).toBeCalled();
    expect(questionRepository.getAllAble).toBeCalled();
    expect(questionRepository.enableById).toBeCalled();
    expect(questionRepository.insert).not.toHaveBeenCalled();
  });
});
