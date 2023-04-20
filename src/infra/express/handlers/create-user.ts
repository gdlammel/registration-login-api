import { CreateUserRequestDTO } from "@/adapters/controllers";
import { Controller } from "@/adapters/controllers/common";
import { HttpResponse } from "@/adapters/presenters";
import { Request, Response } from "express";

export class CreateUserHandler {
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
