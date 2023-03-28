import { Router } from "express";
import { CreateUserFactory } from "@/main/factories";
import { validateCreateUserInput } from "@/infra/validators";

const userRoutes = Router();

const createUserController = CreateUserFactory.create();
userRoutes.post(
	"/",
	validateCreateUserInput.validate,
	createUserController.handle.bind(createUserController)
);

export { userRoutes };
