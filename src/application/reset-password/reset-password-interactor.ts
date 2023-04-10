import { UseCase } from "@/application/common";
import {
	MissingInformationError,
	ResetPasswordError,
} from "@/application/reset-password/errors";
import { User, UserDomainError } from "@/domain/entities";
import { InternalError, UserNotFoundError } from "@/application/common/errors";
import { IResetPasswordGateway } from "@/application/reset-password";

export interface ResetPasswordInputDTO {
	id: string;
	newPassword: string;
}

export class ResetPasswordInteractor
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
	constructor(private gateway: IResetPasswordGateway) {}
	async execute({ id, newPassword }: ResetPasswordInputDTO) {
		try {
			if (!id || !newPassword) {
				return new MissingInformationError();
			}
			const userExists = await this.gateway.findUserByID(id);
			if (!userExists) {
				return new UserNotFoundError();
			}
			const hashedPassword = await this.gateway.hash(
				newPassword
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
			const result = await this.gateway.updatePassword(
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
