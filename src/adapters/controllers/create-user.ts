import { CreateUserInteractor } from "@/application/create-user";
import {Controller} from "@/adapters/controllers/common"
import { EmailAlreadyRegisteredError } from "@/application/create-user/errors";
import { InternalError } from "@/application/common/errors";
import { UserDomainError } from "@/domain/entities";
import { HttpPresenter, HttpResponse } from "@/adapters/presenters";

export interface CreateUserRequestDTO {
		name: string;
		password: string;
		email: string;
		phoneNumber: number
}
export class CreateUserController implements Controller<CreateUserRequestDTO, HttpResponse<string>> {
	constructor(private createUserInteractor: CreateUserInteractor) {}
	async handle({name, password, email, phoneNumber}: CreateUserRequestDTO): Promise<HttpResponse<string>>{

		const result = await this.createUserInteractor.execute({
			name,
			password,
			email,
			phoneNumber,
		});

		if (
			result instanceof EmailAlreadyRegisteredError ||
			result instanceof UserDomainError
			) {
			return HttpPresenter.badRequest("Error creating new user")
		} else if (result instanceof InternalError) {
			return HttpPresenter.internalError("Internal error");
		} 
		return HttpPresenter.created("User created with success!");
	}
}
