import { VerifyTotpControllerFactory } from "@/infra/factories/controllers";
import { ExpressHandler } from "@/infra/express/handlers/common";
import { ExpressHandlerFactory } from "@/infra/express/factories/express-handlers/common";
import { VerifyTotpExpressHandler } from "@/infra/express/handlers";

export class VerifyTotpExpressHandlerFactory implements ExpressHandlerFactory {
	create(): ExpressHandler {
		const verifyTotpController = new VerifyTotpControllerFactory();
		return new VerifyTotpExpressHandler(verifyTotpController.create());
	}
}
