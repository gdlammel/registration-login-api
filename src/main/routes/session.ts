import { validateAuthenticateUserInput } from "@/infra/validators";
import { Router } from "express";
import { AuthenticateUserFactory } from "@/main/factories";

const sessionRoutes = Router();

const authenticateUserController = AuthenticateUserFactory.create();

sessionRoutes.post(
	"/login",
	validateAuthenticateUserInput.validate,
	authenticateUserController.handle.bind(authenticateUserController)
);

export { sessionRoutes };
