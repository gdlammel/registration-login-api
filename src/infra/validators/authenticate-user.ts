import { Request, Response, NextFunction } from "express";
import { z, ZodError } from "zod";
import { ResponseData } from "@/infra/controllers/common";

const authenticateUserSchema = z.object({
	email: z
		.string()
		.email({ message: "Email invalid format" })
		.nonempty({ message: "Email is required" }),
	password: z
		.string()
		.nonempty({ message: "Pasword is required" })
		.min(8, { message: "Password must be at least 8 characters" }),
});

type AuthenticateUserInputData = z.input<typeof authenticateUserSchema>;
export type AuthenticateUserOutputData = z.output<
	typeof authenticateUserSchema
>;

export class validateAuthenticateUserInput {
	static validate(request: Request, response: Response, next: NextFunction) {
		const { email, password }: AuthenticateUserInputData = request.body;
		try {
			const user = authenticateUserSchema.parse({ email, password });
			request.body = user;
			next();
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
