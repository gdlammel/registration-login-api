import { Request, Response, Router } from "express";

import { validateAuthenticateUserInput } from "@/infra/middlewares/validators";
import { AuthenticateUserControllerFactory } from "@/infra/factories";
import { AuthenticateUserRequestDTO } from "@/adapters/controllers";
import { AuthenticateUserHandler } from "../handlers/authenticate-user";

const sessionRoutes = Router();

const authenticateUserControllerFactory =
	new AuthenticateUserControllerFactory();

const authenticateUserController = authenticateUserControllerFactory.create();

const authenticateUserHandler = new AuthenticateUserHandler(
	authenticateUserController
);

sessionRoutes.post(
	"/login",
	validateAuthenticateUserInput.validate,
	authenticateUserHandler.handle.bind(authenticateUserHandler)
);

export { sessionRoutes };
