import { Request, Response, Router } from "express";

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
import {
	CreateUserRequestDTO,
	ForgotPasswordRequestDTO, ResetPasswordRequestDTO,
} from "@/adapters/controllers";

const forgotPasswordAuthentication = new EnsureAuthenticationMiddleware(
	env.forgotPasswordSecret
);

const userRoutes = Router();

const createUserController = CreateUserFactory.create();
const resetPasswordController = ResetPasswordFactory.create();
const forgotPasswordController = ForgotPasswordFactory.create();

userRoutes.post(
	"/",
	validateCreateUserInput.validate,
	async (request: Request, response: Response) => {
		const { name, password, email, phoneNumber }: CreateUserRequestDTO =
			request.body;
		const httpResponse = await createUserController.handle({
			name,
			password,
			email,
			phoneNumber,
		});
		return response.status(httpResponse.statusCode).json(httpResponse.data);
	}
);

userRoutes.post(
	"/forgot-password",
	validateForgotPasswordInput.validate,
	async (request: Request, response: Response) => {
		const { email }: ForgotPasswordRequestDTO = request.body;
		const httpResponse = await forgotPasswordController.handle({ email });
		return response.status(httpResponse.statusCode).json(httpResponse.data);
	}
);

userRoutes.patch(
	"/reset-password",
	forgotPasswordAuthentication.verify.bind(forgotPasswordAuthentication),
	validateResetPasswordInput.validate,
	async (request: Request, response: Response) => {
		const { id, newPassword}: ResetPasswordRequestDTO = request.body
		const httpResponse = await resetPasswordController.handle({ id, newPassword });
		return response.status(httpResponse.statusCode).json(httpResponse.data);
	}
);

export { userRoutes };
