import { Request, Response } from "express";
import { CreateUserUseCase } from "@/application/use-cases/create-user";
import { Controller, ResponseData } from "@/infra/controllers/common";
import { EmailAlreadyRegisteredError } from "@/application/use-cases/create-user/errors";
import { InternalError } from "@/application/use-cases/common/errors";
import { UserDomainError } from "@/domain/entities";

export class CreateUserController implements Controller {
	constructor(private createUserUseCase: CreateUserUseCase) {}
	async handle(request: Request, response: Response): Promise<any> {
		const { name, password, email, phoneNumber } = request.user;
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
			const responseData = ResponseData.badRequest(
				"Error creating new user"
			);
			return response.status(responseData.statusCode).json(responseData);
		} else if (result instanceof InternalError) {
			const responseData = ResponseData.internalError("Internal error");
			return response.status(responseData.statusCode).json(responseData);
		} else {
			const responseData = ResponseData.created(
				"User created with success!"
			);
			return response.status(responseData.statusCode).json(responseData);
		}
	}
}
