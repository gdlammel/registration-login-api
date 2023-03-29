import { UseCase } from "@/domain";
import {
	MissingInformationError,
	ResetPasswordError,
} from "@/application/use-cases/reset-password/errors";
import { IUserRepository } from "@/application/contracts/repositories";
import { UserNotFoundError } from "@/application/use-cases/common/errors";
import { User, UserDomainError } from "@/domain/entities";
import { InternalError } from "@/application/use-cases/common/errors";
import { IHashPasswordProvider } from "@/application/contracts/providers";

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
				| InternalError
			>
		>
{
	constructor(
		private userRepository: IUserRepository,
		private hashPasswordProvider: IHashPasswordProvider
	) {}
	async execute({ id, newPassword }: ResetPasswordInputDTO) {
		try {
			if (!id || !newPassword) {
				return new MissingInformationError();
			}
			const userExists = await this.userRepository.findUserByID(id);
			if (!userExists) {
				return new UserNotFoundError();
			}
			const hashedPassword = await this.hashPasswordProvider.hash(
				userExists.password
			);

			const user = User.create({
				id: userExists.id,
				name: userExists.name,
				password: hashedPassword,
				email: userExists.email,
				phoneNumber: userExists.phoneNumber,
			});
			if (user instanceof UserDomainError) {
				return new UserDomainError();
			}
			const result = await this.userRepository.updatePassword(
				user,
				user.password
			);
			if (!result) {
				return new ResetPasswordError();
			}
			return result;
		} catch (error) {
			return new InternalError();
		}
	}
}
