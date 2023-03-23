import { IUserRepository } from "@/application/contracts/repositories";
import { UseCase } from "@/domain";
import {
	UserNotFoundError,
	UnmatchPasswordError,
} from "@/application/use-cases/authenticate-user/errors";
import {
	IHashPasswordProvider,
	ITokenManagerProvider,
} from "@/application/contracts/providers";

export interface AuthUserInputDTO {
	password: string;
	email: string;
}

export class AuthenticateUserUseCase
	implements
		UseCase<
			AuthUserInputDTO,
			Promise<string | UserNotFoundError | UnmatchPasswordError>
		>
{
	constructor(
		private userRepository: IUserRepository,
		private hashPasswordProvider: IHashPasswordProvider,
		private tokenManagerProvider: ITokenManagerProvider
	) {}

	async execute(
		data: AuthUserInputDTO
	): Promise<string | UserNotFoundError | UnmatchPasswordError> {
		const userExists = await this.userRepository.findUserByEmail(
			data.email
		);
		if (!userExists) {
			return new UserNotFoundError();
		}

		const isPasswordMatch = await this.hashPasswordProvider.compare(
			data.password,
			userExists.password
		);
		if (!isPasswordMatch) {
			return new UnmatchPasswordError();
		}
		const token = await this.tokenManagerProvider.generate(userExists);

		return token;
	}
}