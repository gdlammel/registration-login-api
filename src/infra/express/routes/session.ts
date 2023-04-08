import { validateAuthenticateUserInput } from "@/infra/middlewares/validators";
import { Router } from "express";
import { AuthenticateUserFactory } from "@/infra/factories";

const sessionRoutes = Router();

const authenticateUserController = AuthenticateUserFactory.create();

sessionRoutes.post(
	"/login",
	validateAuthenticateUserInput.validate,
	authenticateUserController.handle.bind(authenticateUserController)
	);

export { sessionRoutes };
