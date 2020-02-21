import { errorResponse, successResponse } from "../utils/helpers";

export const BASE_PATH = "/api/";

const routes = app => {
  app.get(BASE_PATH, (req, res) =>
    successResponse(res, { message: "BillShare API" })
  );
  app.use("*", (req, res) =>
    errorResponse(res, "The requested resource was not found", 404)
  );
};

export default routes;
