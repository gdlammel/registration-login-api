import { InternalError, UserNotFoundError } from "@/application/common/errors";
import { HttpPresenter, HttpResponse } from "@/adapters/presenters";
import { Controller } from "@/adapters/controllers/common";
import { UnmatchTotpError } from "@/application/verify-totp/errors";
import { VerifyTotpInteractor } from "@/application/verify-totp";

export interface VerifyTotpRequestDTO {
	id: string;
	totp: string;
}

export class VerifyTotpController
	implements Controller<VerifyTotpRequestDTO, HttpResponse<string>>
{
	constructor(private verifyTotpInteractor: VerifyTotpInteractor) {}
	async handle({ id, totp }: VerifyTotpRequestDTO) {
		const result = await this.verifyTotpInteractor.execute({
			id,
			totp,
		});
		if (result instanceof InternalError) {
			return HttpPresenter.internalError("Internal error");
		} else if (
			result instanceof UserNotFoundError ||
			result instanceof UnmatchTotpError
		) {
			return HttpPresenter.badRequest("Error verifying totp");
		} else {
			return HttpPresenter.ok(result);
		}
	}
}
