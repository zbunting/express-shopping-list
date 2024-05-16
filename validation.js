import { BadRequestError } from "./expressError";

function checkForBody(req, res, next) {
  if (req.body === undefined || req.body === '') {
    throw new BadRequestError();
  } else {
    return next();
  }
}

export { checkForBody };