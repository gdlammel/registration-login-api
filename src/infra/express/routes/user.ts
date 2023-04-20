import { Request, Response, Router } from "express";

import {
	CreateUserControllerFactory,
	ForgotPasswordControllerFactory,
	ResetPasswordControllerFactory,
} from "@/infra/factories";
import {
	validateCreateUserInput,
	validateResetPasswordInput,
	validateForgotPasswordInput,
} from "@/infra/middlewares/validators";
import { EnsureAuthenticationMiddleware } from "@/infra/middlewares/authentication";
import { env } from "@/infra/env";
import {
	CreateUserRequestDTO,
	ForgotPasswordRequestDTO,
	ResetPasswordRequestDTO,
} from "@/adapters/controllers";
import { CreateUserHandler } from "@/infra/express/handlers/create-user";
import { ForgotPasswordHandler } from "../handlers/forgot-password";
import { ResetPasswordHandler } from "../handlers/reset-password";

const forgotPasswordAuthentication = new EnsureAuthenticationMiddleware(
	env.forgotPasswordSecret
);

const userRoutes = Router();

const createUserControllerFactory = new CreateUserControllerFactory();
const resetPasswordControllerFactory = new ResetPasswordControllerFactory();
const forgotPasswordControllerFactory = new ForgotPasswordControllerFactory();

const createUserController = createUserControllerFactory.create();
const resetPasswordController = resetPasswordControllerFactory.create();
const forgotPasswordController = forgotPasswordControllerFactory.create();

const createUserHandler = new CreateUserHandler(createUserController);
const forgotPasswordHandler = new ForgotPasswordHandler(
	forgotPasswordController
);
const resetPasswordHandler = new ResetPasswordHandler(resetPasswordController);

userRoutes.post(
	"/",
	validateCreateUserInput.validate,
	createUserHandler.handle.bind(createUserHandler)
);

userRoutes.post(
	"/forgot-password",
	validateForgotPasswordInput.validate,
	forgotPasswordHandler.handle.bind(forgotPasswordHandler)
);

userRoutes.patch(
	"/reset-password",
	forgotPasswordAuthentication.verify.bind(forgotPasswordAuthentication),
	validateResetPasswordInput.validate,
	resetPasswordHandler.handle.bind(resetPasswordHandler)
);

export { userRoutes };
