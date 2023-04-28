import { HttpPresenter } from "@/adapters/presenters";
import { NextFunction, Request, Response } from "express";
import { ZodError, z } from "zod";

const verifyTotpInputSchema = z.object({
	id: z.string(),
	totp: z.string().length(6),
});

export class validateTotpInput {
	static validate(request: Request, response: Response, next: NextFunction) {
		const { id, totp } = request.body;
		try {
			const validatedData = verifyTotpInputSchema.parse({
				id,
				totp,
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
			const responseData = HttpPresenter.internalError("Internal error");
			return response.status(responseData.statusCode).json(responseData);
		}
	}
}
