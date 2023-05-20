import { Router } from "express";
import { getUser } from "../controlles/users.controller.js";

const usersRouter = Router();

usersRouter.get("/users/me", getUser);

export default usersRouter;