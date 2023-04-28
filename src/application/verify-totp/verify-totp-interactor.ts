import { UseCase } from "@/application/common";
import { InternalError, UserNotFoundError } from "@/application/common/errors";
import { IVerifyTotpGateway } from "@/application/verify-totp";
import { UnmatchTotpError } from "@/application/verify-totp/errors";

export interface VerifyTotpInputDTO {
	totp: string;
	id: string;
}

export class VerifyTotpInteractor
	implements
		UseCase<
			VerifyTotpInputDTO,
			Promise<
				string | UserNotFoundError | UnmatchTotpError | InternalError
			>
		>
{
	constructor(private gateway: IVerifyTotpGateway) {}
	async execute({ totp, id }: VerifyTotpInputDTO) {
		try {
			const userExists = await this.gateway.findUserByID(id);
			if (!userExists) {
				return new UserNotFoundError();
			}

			const otpIsValid = this.gateway.verifyOtp(
				totp,
				userExists.totpSecret
			);
			if (!otpIsValid) {
				return new UnmatchTotpError();
			}

			return this.gateway.generateToken(userExists);
		} catch (error) {
			return new InternalError();
		}
	}
}
