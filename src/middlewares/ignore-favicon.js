/**
 * ignores requests to fetch favicon
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @param {Function} next next middleware
 */
const ignoreFavicon = (req, res, next) =>
  req.originalUrl &&
  req.originalUrl
    .split("/")
    .pop()
    .includes("favicon")
    ? res.sendStatus(204)
    : next();

export default ignoreFavicon;
