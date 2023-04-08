import {Request, Response, Router} from "express";

import {
	CreateUserFactory,
	ForgotPasswordFactory,
	ResetPasswordFactory,
} from "@/infra/factories";
import {
	validateCreateUserInput,
	validateResetPasswordInput,
	validateForgotPasswordInput,
} from "@/infra/middlewares/validators";
import { EnsureAuthenticationMiddleware } from "@/infra/middlewares/authentication";
import { env } from "@/infra/env";

const forgotPasswordAuthentication = new EnsureAuthenticationMiddleware(env.forgotPasswordSecret);

const userRoutes = Router();

const createUserController = CreateUserFactory.create();
const resetPasswordController = ResetPasswordFactory.create();
const forgotPasswordController = ForgotPasswordFactory.create();

userRoutes.post(
	"/",
	validateCreateUserInput.validate,
	async (request: Request, response: Response) => {
			const data = request.body
			const httpResponse = await createUserController.handle(data)
			return response.status(httpResponse.statusCode).json(httpResponse.data)
	}
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
