import { Router } from "express";

import { validateAuthenticateUserInput } from "@/infra/middlewares/validators";
import { AuthenticateUserExpressHandlerFactory } from "@/infra/express/factories/express-handlers";

class SessionRouter {
	private router: Router = Router();

	constructor(
		private authenticateUserHandlerFactory: AuthenticateUserExpressHandlerFactory
	) {}

	public configureRoutes() {
		this.router.post(
			"/login",
			validateAuthenticateUserInput.validate,
			this.authenticateUserHandler
		);
		return this.router;
	}

	private authenticateUserHandler() {
		return this.authenticateUserHandlerFactory
			.create()
			.handle.bind(this.authenticateUserHandlerFactory.create());
	}
}

export { SessionRouter };
