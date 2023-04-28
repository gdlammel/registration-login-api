import { UseCase } from "@/application/common";
import { UnmatchPasswordError } from "@/application/authenticate-user/errors";
import { InternalError, UserNotFoundError } from "@/application/common/errors";
import { IAuthenticateUserGateway } from "@/application/authenticate-user";
import { env } from "@/infra/env";
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
	constructor(private gateway: IAuthenticateUserGateway) {}

	async execute(data: AuthUserInputDTO) {
		try {
			const userExists = await this.gateway.findUserByEmail(data.email);
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
			const token = this.gateway.generateToken(
				userExists,
				env.jwt2FaSecret,
				env.jwt2FaExpiresIn
			);

			return token;
		} catch (error) {
			return new InternalError();
		}
	}
}
