import { Router } from "express";
import { CreateUserControllerFactory } from "@/main/factories";
import { validateCreateUserInput } from "@/infra/validators";

const userRoutes = Router();

const createUserController = CreateUserControllerFactory.create();
userRoutes.post(
	"/",
	validateCreateUserInput.validate,
	createUserController.handle.bind(createUserController)
);

export { userRoutes };
