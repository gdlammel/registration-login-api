import { UseCase } from "@/application/common";
import { User, UserDomainError } from "@/domain/entities";
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
	async execute({
		email,
	}: ForgotPasswordInputDTO): Promise<
		boolean | EmailNotFoundError | InternalError
	> {
		try {
			const emailExists = await this.gateway.findUserByEmail(email);
			if (!emailExists) {
				return new EmailNotFoundError();
			}
			const createdUserOrError = User.create(emailExists);
			if (createdUserOrError instanceof Error) {
				return new UserDomainError();
			}

			const token = this.gateway.generateToken(
				createdUserOrError,
				env.forgotPasswordSecret
			);
			const result = await this.gateway.sendEmail(
				createdUserOrError,
				token
			);
			return result;
		} catch (error) {
			return new InternalError();
		}
	}
}
