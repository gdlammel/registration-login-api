import {
	IEmailProvider,
	ITokenManagerProvider,
} from "@/application/contracts/providers";
import { IUserRepository } from "@/application/contracts/repositories";
import { UseCase } from "@/domain";
import { User, UserDomainError } from "@/domain/entities";
import { EmailNotFoundError } from "@/application/use-cases/forgot-password/errors";
import { InternalError } from "@/application/use-cases/common/errors";

export interface ForgotPasswordInputDTO {
	email: string;
}

export class ForgotPasswordUseCase
	implements UseCase<ForgotPasswordInputDTO, boolean | EmailNotFoundError>
{
	constructor(
		private userRepository: IUserRepository,
		private tokenManagerService: ITokenManagerProvider,
		private emailProvider: IEmailProvider
	) {}
	async execute({
		email,
	}: ForgotPasswordInputDTO): Promise<
		boolean | EmailNotFoundError | InternalError
	> {
		try {
			const emailExists = await this.userRepository.findUserByEmail(
				email
			);
			if (!emailExists) {
				return new EmailNotFoundError();
			}
			const createdUserOrError = User.create(emailExists);
			if (createdUserOrError instanceof Error) {
				return new UserDomainError();
			}

			const token =
				this.tokenManagerService.generateForgotPassword(
					createdUserOrError
				);
			const result = await this.emailProvider.sendEmail(
				createdUserOrError,
				token
			);
			return result;
		} catch (error) {
			return new InternalError();
		}
	}
}

