import ErrorCheck from '../../../src/submodules/authentication/classes/errorCheck.js';

describe("ErrorCheck", () => {
  it("should instantiate with validation and error msg", () => {
    let msg = "sample error msg"
    let validation = (value) => { return value; }

    let sampleErrorCheck = new ErrorCheck(validation, msg);

    expect(sampleErrorCheck.shouldLoadError).toEqual(validation);
    expect(sampleErrorCheck.msg).toEqual(msg);
  });
});
