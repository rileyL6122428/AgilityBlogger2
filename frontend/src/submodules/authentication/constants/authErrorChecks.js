import ErrorCheck from '../classes/errorCheck.js';

let authErrorChecks = {
  tooShort: new ErrorCheck(
    (value) => { return value.length < 5; },
    "Too short (at least 5 characters long)"
  ),

  tooLong: new ErrorCheck(
    (value) => { return value.length > 35; },
    "Too long (must be less than 36 characters long)"
  ),

  dashesPresent: new ErrorCheck(
    (value) => { return value.indexOf("-") != -1; },
    "Illegal chars (dashes are not allowed)"
  ),

  spacesPresent: new ErrorCheck(
    (value) => { return value.indexOf(" ") != -1; },
    "Illegal chars (spaces are not allowed)"
  )
}

export default authErrorChecks;
