import { Request, Response } from "express";

import { AuthenticateUserRequestDTO } from "@/adapters/controllers";
import { Controller } from "@/adapters/controllers/common";
import { HttpResponse } from "@/adapters/presenters";
import { ExpressHandler } from "@/infra/express/handlers/common";

export class AuthenticateUserExpressHandler implements ExpressHandler {
	constructor(
		private controller: Controller<
			AuthenticateUserRequestDTO,
			HttpResponse<string>
		>
	) {}
	async handle(request: Request, response: Response) {
		const { email, password }: AuthenticateUserRequestDTO = request.body;
		const httpResponse = await this.controller.handle({
			email,
			password,
		});
		return response.status(httpResponse.statusCode).json(httpResponse.data);
	}
}
