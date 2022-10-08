import userFactory from "../factory/userFactory";
import authService from "../../src/services/authService";
import cryptData from "../../src/utils/cryptData";
import commonFactory from "../factory/commonFactory";
import authRepository from "../../src/repositories/authRepository";
import jsonFunctions from "../../src/utils/tokenFuntions";
describe("Sign-Up Tests", () => {
  it("Must Create New User", async () => {
    const user = userFactory.allowUser();
    jest.spyOn(authRepository, "findUserByEmail").mockResolvedValueOnce(null);
    jest
      .spyOn(cryptData, "encriptByHash")
      .mockImplementationOnce(() => commonFactory.randomString());
    jest.spyOn(authRepository, "insert").mockResolvedValueOnce(user);

    const result = await authService.createUser(user);
    expect(result).toStrictEqual(user);
    expect(authRepository.findUserByEmail).toBeCalled();
    expect(authRepository.insert).toBeCalled();
    expect(cryptData.encriptByHash).toBeCalled();
  });

  it("Must Return Conflitct, status 409", async () => {
    const user = userFactory.allowUser();
    jest
      .spyOn(authRepository, "findUserByEmail")
      .mockResolvedValueOnce({ ...user, id: 1 });
    const result = authService.createUser(user);
    expect(result).rejects.toStrictEqual({
      code: "Conflict",
      message: "User Already Exist.",
    });
    expect(authRepository.findUserByEmail).toBeCalled();
  });
});

describe("Sign-in Tests", () => {
  it("Must Sign-in User", async () => {
    const user = userFactory.allowUser();
    const id = commonFactory.randomString();
    const token = commonFactory.randomString();
    const expectReturn = {
      username: user.name,
      userId: 1,
      photo: user.photo,
      token,
    };
    jest
      .spyOn(authRepository, "findUserByEmail")
      .mockResolvedValueOnce({ ...user, id: 1 });
    jest.spyOn(cryptData, "compareHash").mockImplementationOnce(() => true);
    jest.spyOn(cryptData, "encrypt").mockImplementationOnce(() => id);
    jest.spyOn(jsonFunctions, "createJWT").mockImplementationOnce(() => token);

    const result = await authService.login(user);

    expect(result).toStrictEqual(expectReturn);
    expect(authRepository.findUserByEmail).toBeCalled();
    expect(cryptData.compareHash).toBeCalled();
    expect(cryptData.encrypt).toBeCalled();
    expect(jsonFunctions.createJWT).toBeCalled();
  });

  it("Must return Unauthorized, status 401 [WRONG EMAIL]", () => {
    const user = userFactory.allowUser();
    jest.spyOn(authRepository, "findUserByEmail").mockResolvedValueOnce(null);

    const result = authService.login(user);

    expect(result).rejects.toStrictEqual({
      code: "Unauthorized",
      message: "Email or Password Are Incorrect.",
    });
    expect(authRepository.findUserByEmail).toBeCalled();
  });
  it("Must return Unauthorized, status 401 [WRONG PASSWORD]", () => {
    const user = userFactory.allowUser();
    jest
      .spyOn(authRepository, "findUserByEmail")
      .mockResolvedValueOnce({ ...user, id: 1 });
    jest.spyOn(cryptData, "compareHash").mockImplementationOnce(() => false);

    const result = authService.login(user);

    expect(result).rejects.toStrictEqual({
      code: "Unauthorized",
      message: "Email or Password Are Incorrect.",
    });
    expect(authRepository.findUserByEmail).toBeCalled();
    expect(cryptData.compareHash).toBeCalled();
  });
});
