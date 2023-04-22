import { Request, Response } from "express";

import { CreateUserRequestDTO } from "@/adapters/controllers";
import { Controller } from "@/adapters/controllers/common";
import { HttpResponse } from "@/adapters/presenters";

import { ExpressHandler } from "@/infra/express/handlers/common";

export class CreateUserExpressHandler implements ExpressHandler {
	constructor(
		private controller: Controller<
			CreateUserRequestDTO,
			HttpResponse<string>
		>
	) {}
	async handle(request: Request, response: Response) {
		const { name, password, email, phoneNumber }: CreateUserRequestDTO =
			request.body;
		const httpResponse = await this.controller.handle({
			name,
			password,
			email,
			phoneNumber,
		});
		return response.status(httpResponse.statusCode).json(httpResponse.data);
	}
}
