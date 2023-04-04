import { Request, Response } from "express";
import { CreateUserUseCase } from "@/application/use-cases/create-user";
import { Controller } from "@/infra/controllers/common";
import { EmailAlreadyRegisteredError } from "@/application/use-cases/create-user/errors";
import { InternalError } from "@/application/use-cases/common/errors";
import { UserDomainError } from "@/domain/entities";
import { CreatedUserOutputData } from "@/infra/validators";
import { HttpResponseFormatter } from "@/infra/common";

export class CreateUserController implements Controller {
	constructor(private createUserUseCase: CreateUserUseCase) {}
	async handle(request: Request, response: Response): Promise<any> {
		const { name, password, email, phoneNumber }: CreatedUserOutputData =
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
			const responseData = HttpResponseFormatter.badRequest(
				"Error creating new user"
			);
			return response.status(responseData.statusCode).json(responseData);
		} else if (result instanceof InternalError) {
			const responseData =
				HttpResponseFormatter.internalError("Internal error");
			return response.status(responseData.statusCode).json(responseData);
		} else {
			const responseData = HttpResponseFormatter.created(
				"User created with success!"
			);
			return response.status(responseData.statusCode).json(responseData);
		}
	}
}
