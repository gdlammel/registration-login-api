import { z, ZodError } from "zod";
import { Request, Response, NextFunction } from "express";

export interface HttpCreateUserParams {
	name: string;
	password: string;
	email: string;
	phoneNumber: number;
}

const createUserInputSchema = z.object({
	name: z.string().min(2, { message: "Must be 2 or more characters long" }),
	password: z.string(),
	email: z.string().email().nonempty(),
	phoneNumber: z.number(),
});

export type ValidatedUser = z.infer<typeof createUserInputSchema>;

export class validateCreateUserInput {
	static validate(request: Request, response: Response, next: NextFunction) {
		const { name, password, email, phoneNumber }: HttpCreateUserParams =
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
				return response.status(400).json(error.issues[0].message);
			}
			return response.status(500).json("Internal error");
		}
	}
}
