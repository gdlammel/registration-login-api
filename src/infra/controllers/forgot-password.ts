import { InternalError } from "@/application/use-cases/common/errors";
import { ForgotPasswordUseCase } from "@/application/use-cases/forgot-password";
import { EmailNotFoundError } from "@/application/use-cases/forgot-password/errors";
import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { forgotPasswordOutputData } from "../validators/forgot-password";
import { Controller } from "./common";
import { HttpResponseFormatter } from "@/infra/common";

export class ForgotPasswordController implements Controller {
	constructor(private forgotPasswordUseCase: ForgotPasswordUseCase) {}
	async handle(
		request: Request<
			ParamsDictionary,
			any,
			any,
			ParsedQs,
			Record<string, any>
		>,
		response: Response<any, Record<string, any>>
	) {
		const { email }: forgotPasswordOutputData = request.body;
		const result = await this.forgotPasswordUseCase.execute({ email });
		if (result instanceof EmailNotFoundError) {
			const responseData = HttpResponseFormatter.badRequest(
				"Error sending reset password email"
			);
			return response.status(responseData.statusCode).json(responseData);
		} else if (result instanceof InternalError) {
			const responseData =
				HttpResponseFormatter.internalError("Internal error");
			return response.status(responseData.statusCode).json(responseData);
		} else {
			const responseData = HttpResponseFormatter.ok(
				"Email successfully sent"
			);
			return response.status(responseData.statusCode).json(responseData);
		}
	}
}
