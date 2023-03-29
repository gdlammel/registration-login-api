import { InternalError } from "@/application/use-cases/common/errors";
import { ResetPasswordUseCase } from "@/application/use-cases/reset-password";
import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { ResetPasswordOutputData } from "@/infra/validators";
import { Controller, ResponseData } from "./common";

export class ResetPasswordController implements Controller {
	constructor(private resetPasswordUseCase: ResetPasswordUseCase) {}
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
		const { id, newPassword }: ResetPasswordOutputData = request.body;
		const result = await this.resetPasswordUseCase.execute({
			id,
			newPassword,
		});

		if (result === true) {
			const responseData = ResponseData.ok(
				"Password changed successfully"
			);
			return response.status(responseData.statusCode).json(responseData);
		} else if (result instanceof InternalError) {
			const responseData = ResponseData.internalError("Internal error");
			return response.status(responseData.statusCode).json(responseData);
		} else {
			const responseData = ResponseData.badRequest(
				"Error changing password"
			);
			return response.status(responseData.statusCode).json(responseData);
		}
	}
}
