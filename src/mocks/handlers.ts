import { rest } from "msw";
import { usersPath } from "../utils/paths";
import mockData from "./mockData";

function getUsers() {
  return rest.get(usersPath, (req, res, context) => {
    return res(context.status(200), context.json(mockData));
  });
}

export const handlers = [getUsers()];
