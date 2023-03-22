import {
	IHashPasswordProvider,
	IGenerateIDProvider,
} from "@/application/contracts/providers";
import { IUserRepository } from "@/application/contracts/repositories";
import { UseCase } from "@/domain";
import { UserDomainError, User } from "@/domain/entities";
import {
	EmailAlreadyRegisteredError,
	InternalError,
} from "@/application/use-cases/create-user/errors";

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
			const [encryptedPassword, id] = await Promise.all([
				this.hashPasswordProvider.hash(data.password),
				this.generateIDProvider.generate(),
			]);

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
			await this.userRepository.save(createdUserOrError);

			return true;
		} catch (error) {
			return new InternalError();
		}
	}
}
