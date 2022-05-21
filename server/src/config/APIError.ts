/**
 * @export
 * @class APIError
 * @extends {Error}
 */

class APIError extends Error {
  statusCode: number;
  message: string;
  isOperational: boolean;
  stack: string;
  fields: Object | null;

  /**
   * Creates an instance of APIError.
   * @param {number} statusCode
   * @param {string} message
   * @param {boolean} isOperational
   * @param {string} stack
   * @param {Array<string>} fields
   * @memberof APIError
   */
  constructor(
    statusCode: number,
    message: string,
    isOperational = true,
    fields: Object | null = null,
    stack = ""
  ) {
    super(message);

    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.fields = fields;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default APIError;
