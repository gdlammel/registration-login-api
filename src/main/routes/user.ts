import { Router } from "express";
import {
	CreateUserFactory,
	ForgotPasswordFactory,
	ResetPasswordFactory,
} from "@/main/factories";
import {
	validateCreateUserInput,
	validateResetPasswordInput,
	validateForgotPasswordInput,
} from "@/infra/validators";
import { EnsureAuthenticationMiddleware } from "@/infra/middlewares";
import { env } from "@/main/config";

const forgotPasswordAuthentication = new EnsureAuthenticationMiddleware(
	process.env.JWT_FORGOT_PASSWORD_SECRET as string
);

const userRoutes = Router();

const createUserController = CreateUserFactory.create();
const resetPasswordController = ResetPasswordFactory.create();
const forgotPasswordController = ForgotPasswordFactory.create();

userRoutes.post(
	"/",
	validateCreateUserInput.validate,
	createUserController.handle.bind(createUserController)
);

userRoutes.post(
	"/forgot-password",
	validateForgotPasswordInput.validate,
	forgotPasswordController.handle.bind(forgotPasswordController)
);

userRoutes.patch(
	"/reset-password",
	forgotPasswordAuthentication.verify.bind(forgotPasswordAuthentication),
	validateResetPasswordInput.validate,
	resetPasswordController.handle.bind(resetPasswordController)
);

export { userRoutes };
