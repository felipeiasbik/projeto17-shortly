import { Router } from "express";
import { logout, signIn, signUp } from "../controlles/auth.controller.js";

const authRouter = Router();

authRouter.post("/signup", signUp);
authRouter.post("/signin", signIn);
authRouter.post("/logout", logout);

export default authRouter;