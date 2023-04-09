import { UnmatchPasswordError } from "@/application/authenticate-user/errors";
import { InternalError, UserNotFoundError } from "@/application/common/errors";
import { Controller } from "@/adapters/controllers/common";
import { HttpPresenter, HttpResponse } from "@/adapters/presenters";
import { AuthenticateUserInteractor } from "@/application/authenticate-user";

export interface AuthenticateUserRequestDTO {
	email: string;
	password: string;
}

export class AuthenticateUserController
	implements Controller<AuthenticateUserRequestDTO, HttpResponse<string>>
{
	constructor(
		private authenticateUserInteractor: AuthenticateUserInteractor
	) {}
	async handle({
		password,
		email,
	}: AuthenticateUserRequestDTO): Promise<HttpResponse<string>> {
		const result = await this.authenticateUserInteractor.execute({
			email,
			password,
		});
		if (
			result instanceof UserNotFoundError ||
			result instanceof UnmatchPasswordError
		) {
			return HttpPresenter.badRequest("Error authenticating user");
		} else if (result instanceof InternalError) {
			return HttpPresenter.internalError("Internal error");
		}
		return HttpPresenter.ok(result);
	}
}
