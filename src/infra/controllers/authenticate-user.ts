import { AuthenticateUserUseCase } from "@/application/use-cases/authenticate-user";
import { UnmatchPasswordError } from "@/application/use-cases/authenticate-user/errors";
import {
	InternalError,
	UserNotFoundError,
} from "@/application/use-cases/common/errors";
import { Request, Response } from "express";
import { AuthenticateUserOutputData } from "@/infra/validators/authenticate-user";
import { HttpResponseFormatter } from "@/infra/common";

import { Controller } from "@/infra/controllers/common";

export class AuthenticateUserController implements Controller {
	constructor(private authenticateUserUseCase: AuthenticateUserUseCase) {}
	async handle(
		request: Request,
		response: Response<any, Record<string, any>>
	) {
		const { email, password }: AuthenticateUserOutputData = request.body;
		const result = await this.authenticateUserUseCase.execute({
			email,
			password,
		});
		if (
			result instanceof UserNotFoundError ||
			result instanceof UnmatchPasswordError
		) {
			const responseData = HttpResponseFormatter.badRequest(
				"Error authenticating user"
			);
			return response.status(responseData.statusCode).json(responseData);
		} else if (result instanceof InternalError) {
			const responseData =
				HttpResponseFormatter.internalError("Internal error");
			return response.status(responseData.statusCode).json(responseData);
		} else {
			const responseData = HttpResponseFormatter.ok(result);
			return response.status(responseData.statusCode).json(responseData);
		}
	}
}
