import { validateRequest } from "./audioFeatures";

describe("validateRequest function", () => {
  const mockRequest = (body: any) => ({ body });
  const mockResponse = () => {
    const res: any = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };
  const mockNext = jest.fn().mockReturnValue("next");

  beforeEach(() => jest.clearAllMocks());

  it("Allows valid request body", () => {
    const validReqBody = { songList: [], audioFeatures: {} };
    const [req, res] = mockReqRes(validReqBody);
    validateRequest(req as any, res, mockNext);

    expect(mockNext).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });

  it("Rejects invalid request body", () => {
    const invalidReqBody = { songList: [] };
    const [req, res] = mockReqRes(invalidReqBody);
    validateRequest(req as any, res, mockNext);

    expect(mockNext).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalled();
  });

  function mockReqRes(reqBody: any) {
    const req = mockRequest(reqBody),
      res = mockResponse();
    return [req, res];
  }
});
