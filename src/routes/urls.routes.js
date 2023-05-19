import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.js";
import { createShortUrl, deleteUrlId, getShortUrl, getShortUrlId } from "../controlles/urls.controller.js";
import { createShortUrlSchema } from "../schemas/createShortUrl.schema.js";

const urlsRouter = Router();

urlsRouter.post("/urls/shorten", validateSchema(createShortUrlSchema), createShortUrl);
urlsRouter.get("/urls/:id", getShortUrlId);
urlsRouter.get("/urls/open/:shortUrl", getShortUrl);
urlsRouter.delete("/urls/:id", deleteUrlId);

export default urlsRouter;