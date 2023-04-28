import { UseCase } from "@/application/common";
import { EmailNotFoundError } from "@/application/forgot-password/errors";
import { InternalError } from "@/application/common/errors";
import { IForgotPasswordGateway } from "@/application/forgot-password";
import { env } from "@/infra/env";

export interface ForgotPasswordInputDTO {
	email: string;
}

export class ForgotPasswordInteractor
	implements UseCase<ForgotPasswordInputDTO, boolean | EmailNotFoundError>
{
	constructor(private gateway: IForgotPasswordGateway) {}
	async execute({ email }: ForgotPasswordInputDTO) {
		try {
			const emailExists = await this.gateway.findUserByEmail(email);
			if (!emailExists) {
				return new EmailNotFoundError();
			}

			const token = this.gateway.generateToken(
				emailExists,
				env.forgotPasswordSecret,
				env.forgotPasswordExpiresIn
			);
			const result = await this.gateway.sendEmail(emailExists, token);
			return result;
		} catch (error) {
			return new InternalError();
		}
	}
}
