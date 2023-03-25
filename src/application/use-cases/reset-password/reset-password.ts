import { UseCase } from "@/domain";
import {
	MissingInformationError,
	ResetPasswordError,
} from "@/application/use-cases/reset-password/errors";
import { IUserRepository } from "@/application/contracts/repositories";
import { UserNotFoundError } from "@/application/use-cases/authenticate-user/errors";
import { User, UserDomainError } from "@/domain/entities";

export interface ResetPasswordInputDTO {
	id: string;
	newPassword: string;
}

export class ResetPasswordUseCase
	implements
		UseCase<
			ResetPasswordInputDTO,
			Promise<
				| boolean
				| MissingInformationError
				| UserNotFoundError
				| UserDomainError
				| ResetPasswordError
			>
		>
{
	constructor(private userRepository: IUserRepository) {}
	async execute({ id, newPassword }: ResetPasswordInputDTO) {
		if (!id || !newPassword) {
			return new MissingInformationError();
		}
		const userExists = await this.userRepository.findUserByID(id);
		if (!userExists) {
			return new UserNotFoundError();
		}
		const user = User.create(userExists);
		if (user instanceof UserDomainError) {
			return new UserDomainError();
		}
		const result = await this.userRepository.updatePassword(
			user,
			newPassword
		);
		if (!result) {
			return new ResetPasswordError();
		}
		return result;
	}
}
