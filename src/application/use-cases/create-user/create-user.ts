import {
	IHashPasswordProvider,
	IGenerateIDProvider,
} from "@/application/contracts/providers";
import { IUserRepository } from "@/application/contracts/repositories";
import { UseCase } from "@/domain";
import { UserDomainError, User } from "@/domain/entities";
import { EmailAlreadyRegisteredError } from "@/application/use-cases/create-user/errors";
import { InternalError } from "@/application/use-cases/common/errors";

export interface CreateUserInputDTO {
	name: string;
	password: string;
	email: string;
	phoneNumber: number;
}

export class CreateUserUseCase
	implements
		UseCase<
			CreateUserInputDTO,
			Promise<
				| boolean
				| EmailAlreadyRegisteredError
				| UserDomainError
				| InternalError
			>
		>
{
	constructor(
		private userRepository: IUserRepository,
		private generateIDProvider: IGenerateIDProvider,
		private hashPasswordProvider: IHashPasswordProvider
	) {}
	async execute(
		data: CreateUserInputDTO
	): Promise<
		boolean | EmailAlreadyRegisteredError | UserDomainError | InternalError
	> {
		try {
			const emailAlreadyRegistered =
				await this.userRepository.findUserByEmail(data.email);
			if (emailAlreadyRegistered) {
				return new EmailAlreadyRegisteredError();
			}

			const id = this.generateIDProvider.generate();
			const encryptedPassword = await this.hashPasswordProvider.hash(
				data.password
			);

			const createdUserOrError = User.create({
				id,
				name: data.name,
				password: encryptedPassword,
				email: data.email,
				phoneNumber: data.phoneNumber,
			});
			if (createdUserOrError instanceof Error) {
				return new UserDomainError();
			}
			const result = await this.userRepository.save(createdUserOrError);

			return result;
		} catch (error) {
			return new InternalError();
		}
	}
}
