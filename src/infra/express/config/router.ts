import { Router } from "express";

import { UserRouter, AuthRouter } from "@/infra/express/routes";

import {
	AuthenticateUserExpressHandlerFactory,
	CreateUserExpressHandlerFactory,
	ForgotPasswordExpressHandlerFactory,
	ResetPasswordExpressHandlerFactory,
	VerifyTotpExpressHandlerFactory,
} from "@/infra/express/factories/express-handlers";

class AppRouter {
	private router: Router = Router();

	constructor(
		private createUserHandlerFactory: CreateUserExpressHandlerFactory,
		private forgotPasswordHandlerFactory: ForgotPasswordExpressHandlerFactory,
		private resetPasswordHandlerFactory: ResetPasswordExpressHandlerFactory,
		private authenticateUserHandlerFactory: AuthenticateUserExpressHandlerFactory,
		private verifyTotpHandlerFactory: VerifyTotpExpressHandlerFactory
	) {}

	public configureRoutes(): Router {
		const userRouter = new UserRouter(
			this.createUserHandlerFactory,
			this.forgotPasswordHandlerFactory,
			this.resetPasswordHandlerFactory
		);

		const authRouter = new AuthRouter(
			this.authenticateUserHandlerFactory,
			this.verifyTotpHandlerFactory
		);

		this.router.use("/users", userRouter.configureRoutes());
		this.router.use("/auth", authRouter.configureRoutes());
		return this.router;
	}
}

export { AppRouter };
