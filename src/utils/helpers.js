/**
 * Check if current NODE_ENV matches arg
 * @param {string} arg string argument to check current NODE_ENV against
 * @returns {boolean} match
 */
export const nodeEnv = arg => process.env.NODE_ENV === arg;

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
