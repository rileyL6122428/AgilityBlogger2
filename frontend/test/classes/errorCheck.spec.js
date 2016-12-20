import ErrorCheck from '../../src/classes/errorCheck.js';

describe("ErrorCheck", () => {
  it("should instantiate with validation and error msg", () => {
    let msg = "sample error msg"
    let validation = (value) => { return value; }

    let sampleErrorCheck = new ErrorCheck(validation, msg);

    expect(sampleErrorCheck.shouldLoadError).toEqual(validation);
    expect(sampleErrorCheck.msg).toEqual(msg);
  });
});
