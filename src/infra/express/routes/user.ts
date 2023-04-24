import { Router } from "express";

import {
	validateCreateUserInput,
	validateResetPasswordInput,
	validateForgotPasswordInput,
} from "@/infra/middlewares/validators";
import { EnsureAuthenticationMiddleware } from "@/infra/middlewares/authentication";
import { env } from "@/infra/env";
import {
	CreateUserExpressHandlerFactory,
	ForgotPasswordExpressHandlerFactory,
	ResetPasswordExpressHandlerFactory,
} from "@/infra/express/factories/express-handlers";

const forgotPasswordAuthentication = new EnsureAuthenticationMiddleware(
	env.forgotPasswordSecret
);

const userRoutes = Router();

const createUserExpressHandlerFactory = new CreateUserExpressHandlerFactory();
const resetPasswordExpressHandlerFactory =
	new ResetPasswordExpressHandlerFactory();
const forgotPasswordExpressHandlerFactory =
	new ForgotPasswordExpressHandlerFactory();

const createUserExpressHandler = createUserExpressHandlerFactory.create();
const resetPasswordExpressHandler = resetPasswordExpressHandlerFactory.create();
const forgotPasswordExpressHandler =
	forgotPasswordExpressHandlerFactory.create();

userRoutes.post(
	"/",
	validateCreateUserInput.validate,
	createUserExpressHandler.handle.bind(createUserExpressHandler)
);

userRoutes.post(
	"/forgot-password",
	validateForgotPasswordInput.validate,
	forgotPasswordExpressHandler.handle.bind(forgotPasswordExpressHandler)
);

userRoutes.patch(
	"/reset-password",
	forgotPasswordAuthentication.verify.bind(forgotPasswordAuthentication),
	validateResetPasswordInput.validate,
	resetPasswordExpressHandler.handle.bind(resetPasswordExpressHandler)
);

export { userRoutes };
