import { InternalError } from "@/application/common/errors";
import { Controller } from "./common";
import { HttpPresenter, HttpResponse } from "@/adapters/presenters";
import { ResetPasswordInteractor } from "@/application/reset-password";

export interface ResetPasswordRequestDTO {
	id: string
	newPassword: string
}

export class ResetPasswordController implements Controller<ResetPasswordRequestDTO, HttpResponse<string>> {
	constructor(private resetPasswordInteractor: ResetPasswordInteractor) {}
	async handle({ id, newPassword }: ResetPasswordRequestDTO) {
		const result = await this.resetPasswordInteractor.execute({
			id,
			newPassword,
		});

		if (result === true) {
			return HttpPresenter.ok("Password changed successfully");
		} else if (result instanceof InternalError) {
			return HttpPresenter.internalError("Internal error");
		} 
			return HttpPresenter.badRequest("Error changing password");
	}
}
