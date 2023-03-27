import { z, ZodError } from "zod";
import { Request, Response, NextFunction } from "express";
import { ResponseData } from "@/infra/controllers/common";

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
export type ValidatedUser = z.output<typeof createUserInputSchema>;

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
			request.user = user;
			return next();
		} catch (error) {
			if (error instanceof ZodError) {
				const responseData = ResponseData.badRequest(
					error.issues[0].message
				);
				return response
					.status(responseData.statusCode)
					.json(responseData);
			}
			const responseData = ResponseData.internalError("Internal error");
			return response.status(responseData.statusCode).json(responseData);
		}
	}
}
