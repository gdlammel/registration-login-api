import { UseCase } from "@/application/common";
import { UnmatchPasswordError } from "@/application/authenticate-user/errors";
import {
	InternalError,
	UserNotFoundError,
} from "@/application/common/errors";
import {IAuthenticateUserGateway} from "@/application/authenticate-user";

export interface AuthUserInputDTO {
	password: string;
	email: string;
}

export class AuthenticateUserInteractor
	implements
		UseCase<
			AuthUserInputDTO,
			Promise<string | UserNotFoundError | UnmatchPasswordError>
		>
{
	constructor(
		private gateway: IAuthenticateUserGateway
	) {}

	async execute(
		data: AuthUserInputDTO
	): Promise<
		string | UserNotFoundError | UnmatchPasswordError | InternalError
	> {
		try {
			const userExists = await this.gateway.findUserByEmail(
				data.email
			);
			if (!userExists) {
				return new UserNotFoundError();
			}

			const isPasswordMatch = await this.gateway.compare(
				data.password,
				userExists.password
			);
			if (!isPasswordMatch) {
				return new UnmatchPasswordError();
			}
			const token = this.gateway.generateToken(userExists);

			return token;
		} catch (error) {
			return new InternalError();
		}
	}
}
