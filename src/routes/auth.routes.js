import { Router } from "express";
import { logout, signIn, signUp } from "../controlles/auth.controller.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { signUpSchema } from "../schemas/signup.schema.js";

const authRouter = Router();

authRouter.post("/signup", validateSchema(signUpSchema) ,signUp);
authRouter.post("/signin", signIn);
authRouter.post("/logout", logout);

export default authRouter;