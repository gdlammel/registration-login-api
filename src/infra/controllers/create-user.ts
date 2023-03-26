import { Request, Response } from "express";
import { CreateUserUseCase } from "@/application/use-cases/create-user";
import { Controller, ResponseData } from "@/infra/controllers/common";
import {
	EmailAlreadyRegisteredError,
	InternalError,
} from "@/application/use-cases/create-user/errors";
import { UserDomainError } from "@/domain/entities";

interface HttpCreateUserParams {
	name: string;
	password: string;
	email: string;
	phoneNumber: number;
}
export class CreateUserController implements Controller {
	constructor(private createUserUseCase: CreateUserUseCase) {}
	async handle(request: Request, response: Response): Promise<any> {
		const { name, password, email, phoneNumber }: HttpCreateUserParams =
			request.body;
		const result = await this.createUserUseCase.execute({
			name,
			password,
			email,
			phoneNumber,
		});

		if (
			result instanceof EmailAlreadyRegisteredError ||
			result instanceof UserDomainError
		) {
			return response.json(ResponseData.badRequest(result));
		} else if (result instanceof InternalError) {
			return response.json(ResponseData.internalError(result));
		} else {
			return response.json(
				ResponseData.created("User created with success!")
			);
		}
	}
}
