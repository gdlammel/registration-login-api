import { Router } from "express";
import { CreateUserFactory, ResetPasswordFactory } from "@/main/factories";
import {
	validateCreateUserInput,
	validateResetPasswordInput,
} from "@/infra/validators";
import { EnsureAuthenticationMiddleware } from "@/infra/middlewares";

const userRoutes = Router();

const createUserController = CreateUserFactory.create();
const resetPasswordController = ResetPasswordFactory.create();

userRoutes.post(
	"/",
	validateCreateUserInput.validate,
	createUserController.handle.bind(createUserController)
);

userRoutes.patch(
	"/reset-password",
	EnsureAuthenticationMiddleware.verify,
	validateResetPasswordInput.validate,
	resetPasswordController.handle.bind(resetPasswordController)
);

export { userRoutes };
