import { ExpressHandler } from "@/infra/express/handlers/common";
import { ExpressHandlerFactory } from "@/infra/factories/express-handlers/common";
import { ResetPasswordControllerFactory } from "@/infra/factories/controllers";
import { ResetPasswordExpressHandler } from "@/infra/express/handlers";

export class ResetPasswordExpressHandlerFactory
	implements ExpressHandlerFactory
{
	create(): ExpressHandler {
		const resetPasswordControllerFactory =
			new ResetPasswordControllerFactory();
		return new ResetPasswordExpressHandler(
			resetPasswordControllerFactory.create()
		);
	}
}
