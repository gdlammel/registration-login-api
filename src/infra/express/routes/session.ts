import { Router } from "express";

import { validateAuthenticateUserInput } from "@/infra/middlewares/validators";
import { AuthenticateUserExpressHandlerFactory } from "@/infra/express/factories/express-handlers";

const sessionRoutes = Router();

const authenticateUserExpressHandlerFactory =
	new AuthenticateUserExpressHandlerFactory();

const authenticateUserExpressHandler =
	authenticateUserExpressHandlerFactory.create();

sessionRoutes.post(
	"/login",
	validateAuthenticateUserInput.validate,
	authenticateUserExpressHandler.handle.bind(authenticateUserExpressHandler)
);

export { sessionRoutes };
