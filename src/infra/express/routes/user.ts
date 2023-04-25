import { Router } from "express";

import {
	CreateUserExpressHandlerFactory,
	ForgotPasswordExpressHandlerFactory,
	ResetPasswordExpressHandlerFactory,
} from "@/infra/express/factories/express-handlers";
import {
	validateCreateUserInput,
	validateResetPasswordInput,
	validateForgotPasswordInput,
} from "@/infra/middlewares/validators";
import { EnsureAuthenticationMiddleware } from "@/infra/middlewares/authentication";
import { env } from "@/infra/env";

const forgotPasswordAuthentication = new EnsureAuthenticationMiddleware(
	env.forgotPasswordSecret
);

class UserRouter {
	private router: Router = Router();

	constructor(
		private createUserHandlerFactory: CreateUserExpressHandlerFactory,
		private forgotPasswordHandlerFactory: ForgotPasswordExpressHandlerFactory,
		private resetPasswordHandlerFactory: ResetPasswordExpressHandlerFactory
	) {}

	public configureRoutes(): Router {
		this.router.post(
			"/",
			validateCreateUserInput.validate,
			this.createUserHandler()
		);

		this.router.post(
			"/forgot-password",
			validateForgotPasswordInput.validate,
			this.forgotPasswordHandler()
		);

		this.router.patch(
			"/reset-password",
			forgotPasswordAuthentication.verify.bind(
				forgotPasswordAuthentication
			),
			validateResetPasswordInput.validate,
			this.resetPasswordHandler()
		);

		return this.router;
	}

	private createUserHandler() {
		return this.createUserHandlerFactory
			.create()
			.handle.bind(this.createUserHandlerFactory.create());
	}

	private forgotPasswordHandler() {
		return this.forgotPasswordHandlerFactory
			.create()
			.handle.bind(this.forgotPasswordHandlerFactory.create());
	}

	private resetPasswordHandler() {
		return this.resetPasswordHandlerFactory
			.create()
			.handle.bind(this.resetPasswordHandlerFactory.create());
	}
}

export { UserRouter };
