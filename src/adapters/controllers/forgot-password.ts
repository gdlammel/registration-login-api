import { InternalError } from "@/application/common/errors";
import { EmailNotFoundError } from "@/application/forgot-password/errors";
import { Controller } from "@/adapters/controllers/common";

import { HttpPresenter, HttpResponse } from "@/adapters/presenters";
import { ForgotPasswordInteractor } from "@/application/forgot-password";

export interface ForgotPasswordRequestDTO {
	email: string;
}

export class ForgotPasswordController
	implements Controller<ForgotPasswordRequestDTO, HttpResponse<string>>
{
	constructor(private forgotPasswordInteractor: ForgotPasswordInteractor) {}
	async handle({
		email,
	}: ForgotPasswordRequestDTO): Promise<HttpResponse<string>> {
		const result = await this.forgotPasswordInteractor.execute({ email });
		if (result instanceof EmailNotFoundError) {
			return HttpPresenter.badRequest(
				"Error sending reset password email"
			);
		} else if (result instanceof InternalError) {
			return HttpPresenter.internalError("Internal error");
		}
		return HttpPresenter.ok("Email successfully sent");
	}
}
