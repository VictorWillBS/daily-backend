import questionService from "../../src/services/questionService";
import questionRepository from "../../src/repositories/questionRepository";
import questionFactory from "../factory/questionFactory";
import commonFactory from "../factory/commonFactory";
import * as generateDate from "../../src/utils/generateDate";

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

describe("Disable Question Test", () => {
  it("Muist Disable Question", async () => {
    const question = questionFactory.allowQuestion();
    const userId = commonFactory.randomNumber();
    jest.spyOn(questionRepository, "getById").mockResolvedValueOnce(question);
    jest.spyOn(questionRepository, "disableById").mockResolvedValueOnce(true);

    const result = await questionService.disableQuestion(question.id, userId);

    expect(result).toBe(true);
    expect(questionRepository.getById).toBeCalled();
    expect(questionRepository.disableById).toBeCalled();
  });
  it("Muist Return Not Found Question Question", async () => {
    const question = questionFactory.allowQuestion();
    const userId = commonFactory.randomNumber();
    jest.spyOn(questionRepository, "getById").mockResolvedValueOnce(null);
    jest.spyOn(questionRepository, "disableById");

    const result = questionService.disableQuestion(question.id, userId);

    expect(result).rejects.toStrictEqual({
      code: "Not Found",
      message: "Questão não encontrada.",
    });
    expect(questionRepository.getById).toBeCalled();
    expect(questionRepository.disableById).not.toHaveBeenCalled();
  });
});

describe("Get Question Test", () => {
  it("Must Get All Questions", async () => {
    const question = questionFactory.allowQuestion;
    const userId = commonFactory.randomNumber();
    const today = "2022-10-10";
    const resultExpect = [question(), question()];
    jest.spyOn(generateDate, "default").mockImplementationOnce(() => today);
    jest
      .spyOn(questionRepository, "getAllToday")
      .mockResolvedValueOnce(resultExpect);

    const result = await questionService.getQuestions(userId);

    expect(result).toStrictEqual(resultExpect);
    expect(generateDate.default).toBeCalled();
    expect(questionRepository.getAllToday).toBeCalled();
  });
});

describe("Get Question By Date", () => {
  it("Must Get Question by Date", async () => {
    const question = questionFactory.allowQuestion;
    const userId = commonFactory.randomNumber();
    const date = "2022-10-10";
    const disableQuestions = [
      { ...question(), answer: [1, 2] },
      { ...question(), answer: [1, 2] },
    ];
    const todayQuestions = [question(), question()];
    const resultExpect = [...disableQuestions, ...todayQuestions];
    jest
      .spyOn(questionRepository, "getByDate")
      .mockResolvedValueOnce(disableQuestions);
    jest
      .spyOn(questionRepository, "getAllToday")
      .mockResolvedValueOnce(todayQuestions);

    const result = await questionService.getQuestionsByDate(date, userId);

    expect(result).toStrictEqual(resultExpect);
    expect(questionRepository.getByDate).toBeCalled();
    expect(questionRepository.getAllToday).toBeCalled();
  });
});
