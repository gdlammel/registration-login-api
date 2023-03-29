import { AuthenticateUserUseCase } from "@/application/use-cases/authenticate-user";
import { UnmatchPasswordError } from "@/application/use-cases/authenticate-user/errors";
import {
	InternalError,
	UserNotFoundError,
} from "@/application/use-cases/common/errors";
import { Request, Response } from "express";
import { AuthenticateUserOutputtData } from "@/infra/validators/authenticate-user";

import { Controller, ResponseData } from "@/infra/controllers/common";

export class AuthenticateUserController implements Controller {
	constructor(private authenticateUserUseCase: AuthenticateUserUseCase) {}
	async handle(
		request: Request,
		response: Response<any, Record<string, any>>
	) {
		const { email, password }: AuthenticateUserOutputtData = request.body;
		const result = await this.authenticateUserUseCase.execute({
			email,
			password,
		});
		if (
			result instanceof UserNotFoundError ||
			result instanceof UnmatchPasswordError
		) {
			const responseData = ResponseData.badRequest(
				"Error authenticating user"
			);
			return response.status(responseData.statusCode).json(responseData);
		} else if (result instanceof InternalError) {
			const responseData = ResponseData.internalError("Internal error");
			return response.status(responseData.statusCode).json(responseData);
		} else {
			const responseData = ResponseData.ok(result);
			return response.status(responseData.statusCode).json(responseData);
		}
	}
}
