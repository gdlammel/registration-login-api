import { Router } from "express";

import { validateAuthenticateUserInput } from "@/infra/middlewares/validators";
import {
	AuthenticateUserExpressHandlerFactory,
	VerifyTotpExpressHandlerFactory,
} from "@/infra/express/factories/express-handlers";
import { EnsureAuthenticationMiddleware } from "@/infra/middlewares/authentication";
import { env } from "@/infra/env";
import { validateTotpInput } from "@/infra/middlewares/validators";

const verifyOtpAuthentication = new EnsureAuthenticationMiddleware(
	env.jwt2FaSecret
);

class AuthRouter {
	private router: Router = Router();

	constructor(
		private authenticateUserHandlerFactory: AuthenticateUserExpressHandlerFactory,
		private verifyTotpHandlerFactory: VerifyTotpExpressHandlerFactory
	) {}

	public configureRoutes() {
		this.router.post(
			"/login",
			validateAuthenticateUserInput.validate,
			this.authenticateUserHandler()
		);

		this.router.post(
			"/verify-totp",
			verifyOtpAuthentication.verify.bind(verifyOtpAuthentication),
			validateTotpInput.validate,
			this.verifyTotpHandler()
		);

		return this.router;
	}

	private authenticateUserHandler() {
		return this.authenticateUserHandlerFactory
			.create()
			.handle.bind(this.authenticateUserHandlerFactory.create());
	}

	private verifyTotpHandler() {
		return this.verifyTotpHandlerFactory
			.create()
			.handle.bind(this.verifyTotpHandlerFactory.create());
	}
}

export { AuthRouter };
