import { InternalError } from "@/application/use-cases/common/errors";
import { ForgotPasswordUseCase } from "@/application/use-cases/forgot-password";
import { EmailNotFoundError } from "@/application/use-cases/forgot-password/errors";
import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { forgotPasswordOutputData } from "../validators/forgot-password";
import { Controller, ResponseData } from "./common";

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
			const responseData = ResponseData.badRequest(
				"Error sending reset password email"
			);
			return response.status(responseData.statusCode).json(responseData);
		} else if (result instanceof InternalError) {
			const responseData = ResponseData.internalError("Internal error");
			return response.status(responseData.statusCode).json(responseData);
		} else {
			const responseData = ResponseData.ok("Email successfully sent");
			return response.status(responseData.statusCode).json(responseData);
		}
	}
}
