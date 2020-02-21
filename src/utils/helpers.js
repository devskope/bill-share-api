/**
 *  @const {boolean} prodEnv returns true if app is running in a production environment
 */
export const prodEnv = process.env.NODE_ENV === "production";

/**
 * Sends an error response to the client
 * @param {Response} res Response object
 * @param {object} error error object
 * @param {number} statusCode status code
 * @returns {Response} error response
 */
export const errorResponse = (res, error, statusCode = 500) =>
  res.status(statusCode).json(error);

/**
 * Sends a success response to the client
 * @param {Response} res Response object
 * @param {object} data data to send
 * @param {number} statusCode status code
 * @returns {Response} success response
 */
export const successResponse = (res, data, statusCode = 200) =>
  res.status(statusCode).json(data);
