import { Request, Response } from "express";

import { ResetPasswordRequestDTO } from "@/adapters/controllers";
import { Controller } from "@/adapters/controllers/common";
import { HttpResponse } from "@/adapters/presenters";

export class ResetPasswordHandler {
	constructor(
		private controller: Controller<
			ResetPasswordRequestDTO,
			HttpResponse<string>
		>
	) {}
	async handle() {
		async (request: Request, response: Response) => {
			const { id, newPassword }: ResetPasswordRequestDTO = request.body;
			const httpResponse = await this.controller.handle({
				id,
				newPassword,
			});
			return response
				.status(httpResponse.statusCode)
				.json(httpResponse.data);
		};
	}
}
