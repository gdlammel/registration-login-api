import { ExpressHandler } from "@/infra/express/handlers/common";
import { ExpressHandlerFactory } from "@/infra/factories/express-handlers/common";
import { ForgotPasswordControllerFactory } from "@/infra/factories/controllers";
import { ForgotPasswordExpressHandler } from "@/infra/express/handlers";

export class ForgotPasswordExpressHandlerFactory
	implements ExpressHandlerFactory
{
	create(): ExpressHandler {
		const forgotPasswordControllerFactory =
			new ForgotPasswordControllerFactory();
		return new ForgotPasswordExpressHandler(
			forgotPasswordControllerFactory.create()
		);
	}
}
