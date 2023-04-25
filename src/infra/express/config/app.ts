import express from "express";
import cors from "cors";

import { AppRouter } from "@/infra/express/config";
import {
	CreateUserExpressHandlerFactory,
	ForgotPasswordExpressHandlerFactory,
	ResetPasswordExpressHandlerFactory,
	AuthenticateUserExpressHandlerFactory,
} from "@/infra/express/factories/express-handlers";

class ExpressApp {
	public _app = express();
	private appRouter: AppRouter;

	constructor() {
		this.appRouter = this.createAppRouter();
		this.configureMiddlewares();
		this.configureRoutes();
	}

	private initializeFactories() {
		return {
			createUserHandlerFactory: new CreateUserExpressHandlerFactory(),
			forgotPasswordHandlerFactory:
				new ForgotPasswordExpressHandlerFactory(),
			resetPasswordHandlerFactory:
				new ResetPasswordExpressHandlerFactory(),
			authenticateUserHandlerFactory:
				new AuthenticateUserExpressHandlerFactory(),
		};
	}

	private createAppRouter() {
		const {
			createUserHandlerFactory,
			forgotPasswordHandlerFactory,
			resetPasswordHandlerFactory,
			authenticateUserHandlerFactory,
		} = this.initializeFactories();

		return new AppRouter(
			createUserHandlerFactory,
			forgotPasswordHandlerFactory,
			resetPasswordHandlerFactory,
			authenticateUserHandlerFactory
		);
	}
	private configureMiddlewares() {
		this._app.use(express.json());
		this._app.use(
			cors({
				credentials: true,
				allowedHeaders: ["Authorization"],
				origin: "*",
			})
		);
	}

	private configureRoutes() {
		this._app.use("/api", this.appRouter.configureRoutes());
	}

	public get app() {
		return this._app;
	}
}

export { ExpressApp };
