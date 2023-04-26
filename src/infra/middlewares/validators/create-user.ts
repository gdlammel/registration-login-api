import { z, ZodError } from "zod";
import { Request, Response, NextFunction } from "express";

import { HttpPresenter } from "@/adapters/presenters";

const createUserInputSchema = z.object({
	name: z
		.string()
		.nonempty({ message: "Name is required" })
		.min(1, { message: "Must be 1 or more characters long" }),
	password: z
		.string()
		.nonempty({ message: "Pasword is required" })
		.min(8, { message: "Password must be at least 8 characters" }),
	email: z
		.string()
		.email({ message: "Invalid format" })
		.nonempty({ message: "Email is required" }),
	phoneNumber: z.number(),
});

type CreatedUserInputData = z.input<typeof createUserInputSchema>;
export type CreatedUserOutputData = z.output<typeof createUserInputSchema>;

export class validateCreateUserInput {
	static validate(request: Request, response: Response, next: NextFunction) {
		const { name, password, email, phoneNumber }: CreatedUserInputData =
			request.body;
		try {
			const user = createUserInputSchema.parse({
				name,
				password,
				email,
				phoneNumber,
			});
			request.body = user;
			next();
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
