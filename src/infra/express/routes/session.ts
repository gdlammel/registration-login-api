import { Request, Response, Router } from "express";

import { validateAuthenticateUserInput } from "@/infra/middlewares/validators";
import { AuthenticateUserControllerFactory } from "@/infra/factories";
import { AuthenticateUserRequestDTO } from "@/adapters/controllers";

const sessionRoutes = Router();

const authenticateUserControllerFactory =
	new AuthenticateUserControllerFactory();

const authenticateUserController = authenticateUserControllerFactory.create();

sessionRoutes.post(
	"/login",
	validateAuthenticateUserInput.validate,
	async (request: Request, response: Response) => {
		const { email, password }: AuthenticateUserRequestDTO = request.body;
		const httpResponse = await authenticateUserController.handle({
			email,
			password,
		});
		return response.status(httpResponse.statusCode).json(httpResponse.data);
	}
);

export { sessionRoutes };
