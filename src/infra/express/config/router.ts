import { Router } from "express";

import { UserRouter } from "@/infra/express/routes";
import { SessionRouter } from "@/infra/express/routes";

import {
	AuthenticateUserExpressHandlerFactory,
	CreateUserExpressHandlerFactory,
	ForgotPasswordExpressHandlerFactory,
	ResetPasswordExpressHandlerFactory,
} from "@/infra/express/factories/express-handlers";

class AppRouter {
	private router: Router = Router();

	constructor(
		private createUserHandlerFactory: CreateUserExpressHandlerFactory,
		private forgotPasswordHandlerFactory: ForgotPasswordExpressHandlerFactory,
		private resetPasswordHandlerFactory: ResetPasswordExpressHandlerFactory,
		private authenticateUserHandlerFactory: AuthenticateUserExpressHandlerFactory
	) {}

	public configureRoutes(): Router {
		const userRouter = new UserRouter(
			this.createUserHandlerFactory,
			this.forgotPasswordHandlerFactory,
			this.resetPasswordHandlerFactory
		);

		const sessionRouter = new SessionRouter(
			this.authenticateUserHandlerFactory
		);

		this.router.use("/users", userRouter.configureRoutes());
		this.router.use("/session", sessionRouter.configureRoutes());
		return this.router;
	}
}

export { AppRouter };
