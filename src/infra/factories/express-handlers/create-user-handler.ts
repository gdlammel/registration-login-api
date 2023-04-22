import { ExpressHandler } from "@/infra/express/handlers/common";
import { ExpressHandlerFactory } from "@/infra/factories/express-handlers/common";
import { CreateUserControllerFactory } from "@/infra/factories/controllers";
import { CreateUserExpressHandler } from "@/infra/express/handlers";

export class CreateUserExpressHandlerFactory implements ExpressHandlerFactory {
	create(): ExpressHandler {
		const createUserControllerFactory = new CreateUserControllerFactory();
		return new CreateUserExpressHandler(
			createUserControllerFactory.create()
		);
	}
}
