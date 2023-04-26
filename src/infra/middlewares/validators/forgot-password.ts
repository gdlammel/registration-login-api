import { Request, Response, NextFunction } from "express";
import { z, ZodError } from "zod";

import { HttpPresenter } from "@/adapters/presenters";

const forgotPasswordSchema = z.object({
	email: z
		.string()
		.email({ message: "Email invalid format" })
		.nonempty({ message: "Email is required" }),
});

export type forgotPasswordOutputData = z.output<typeof forgotPasswordSchema>;

export class validateForgotPasswordInput {
	static validate(request: Request, response: Response, next: NextFunction) {
		const { email } = request.body;
		try {
			forgotPasswordSchema.parse({ email });
			return next();
		} catch (error) {
			if (error instanceof ZodError) {
				const responseData = HttpPresenter.badRequest(
					error.issues[0].message
				);
				return response
					.status(responseData.statusCode)
					.json(responseData);
			}
			const responseData = HttpPresenter.internalError("Internal error");
			return response.status(responseData.statusCode).json(responseData);
		}
	}
}
