import { Request, Response } from "express";
import { ExpressHandler } from "@/infra/express/handlers/common";
import { Controller } from "@/adapters/controllers/common";
import { HttpResponse } from "@/adapters/presenters";
import { VerifyTotpRequestDTO } from "@/adapters/controllers";

export class VerifyTotpExpressHandler implements ExpressHandler {
	constructor(
		private controller: Controller<
			VerifyTotpRequestDTO,
			HttpResponse<string>
		>
	) {}
	async handle(request: Request, response: Response) {
		const { id, totp }: VerifyTotpRequestDTO = request.body;
		const httpResponse = await this.controller.handle({ id, totp });
		return response.status(httpResponse.statusCode).json(httpResponse.data);
	}
}
