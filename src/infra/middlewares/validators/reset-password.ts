import { Request, Response, NextFunction } from "express";
import { z, ZodError } from "zod";

import { HttpPresenter } from "@/adapters/presenters";

const resetPasswordInputSchema = z.object({
	id: z.string().nonempty({ message: "Id is required" }),
	newPassword: z
		.string()
		.nonempty({ message: "Pasword is required" })
		.min(8, { message: "Password must be at least 8 characters" }),
});

export type ResetPasswordOutputData = z.output<typeof resetPasswordInputSchema>;

export class validateResetPasswordInput {
	static validate(request: Request, response: Response, next: NextFunction) {
		const { id, newPassword } = request.body;
		try {
			const validatedData = resetPasswordInputSchema.parse({
				id,
				newPassword,
			});
			request.body = validatedData;
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
			const responseData =
				HttpPresenter.internalError("Internal error");
			return response.status(responseData.statusCode).json(responseData);
		}
	}
}
