import { validationResult, matchedData } from 'express-validator';
import Response, {
  ErrorResponse,
  ValidationErrorResponse,
} from '../helpers/Response';

/**
 * Schema validator
 * @param {Array} schemas
 * @param {number} status
 * @returns {Array} an array of validation schema and middleware
 */
export default (schemas: any) => {
  const validatorCheck = async (req: any, res: any, next: any) => {
    const errors = validationResult(req);
    req = { ...req, ...matchedData(req) };

    if (!errors.isEmpty()) {
      const mapErrors = Object.entries(errors.mapped()).reduce(
        (accumulator, [key, value]) => {
          // @ts-ignore
          accumulator[key] = value.msg;
          return accumulator;
        },
        {}
      );

      const response = new ValidationErrorResponse(
        400,
        'Validation Error!',
        mapErrors
      );
      return res.status(response.code).json(response);
    }

    return next();
  };
  return [...(schemas.length && [schemas]), validatorCheck];
};
