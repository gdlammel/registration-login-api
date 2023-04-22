import { ExpressHandler } from "@/infra/express/handlers/common";
import { ExpressHandlerFactory } from "@/infra/factories/express-handlers/common";
import { AuthenticateUserControllerFactory } from "@/infra/factories/controllers";
import { AuthenticateUserExpressHandler } from "@/infra/express/handlers/authenticate-user";

export class AuthenticateUserExpressHandlerFactory
	implements ExpressHandlerFactory
{
	create(): ExpressHandler {
		const authenticateUserControllerFactory =
			new AuthenticateUserControllerFactory();
		return new AuthenticateUserExpressHandler(
			authenticateUserControllerFactory.create()
		);
	}
}
