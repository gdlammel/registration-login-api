import { Request, Response } from "express";

import { ForgotPasswordRequestDTO } from "@/adapters/controllers";
import { Controller } from "@/adapters/controllers/common";
import { HttpResponse } from "@/adapters/presenters";
import { ExpressHandler } from "@/infra/express/handlers/common";

export class ForgotPasswordExpressHandler implements ExpressHandler {
	constructor(
		private controller: Controller<
			ForgotPasswordRequestDTO,
			HttpResponse<string>
		>
	) {}

	async handle(request: Request, response: Response) {
		const { email }: ForgotPasswordRequestDTO = request.body;
		const httpResponse = await this.controller.handle({ email });
		return response.status(httpResponse.statusCode).json(httpResponse.data);
	}
}
