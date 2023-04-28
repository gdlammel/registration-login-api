import { UseCase } from "@/application/common";
import { UserDomainError, User } from "@/domain/entities";
import { EmailAlreadyRegisteredError } from "@/application/create-user/errors";
import { InternalError } from "@/application/common/errors";
import { ICreateUserGateway } from "@/application/create-user/create-user-gateway";

export interface CreateUserInputDTO {
	name: string;
	password: string;
	email: string;
	phoneNumber: number;
}

export class CreateUserInteractor
	implements
		UseCase<
			CreateUserInputDTO,
			Promise<
				| string
				| EmailAlreadyRegisteredError
				| UserDomainError
				| InternalError
			>
		>
{
	constructor(private gateway: ICreateUserGateway) {}
	async execute(data: CreateUserInputDTO) {
		try {
			const emailAlreadyRegistered = await this.gateway.findUserByEmail(
				data.email
			);
			if (emailAlreadyRegistered) {
				return new EmailAlreadyRegisteredError();
			}

			const id = this.gateway.generateId();
			const encryptedPassword = await this.gateway.hash(data.password);

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
			await this.gateway.save(createdUserOrError);
			return this.gateway.generateTotpSeed(
				createdUserOrError.name,
				createdUserOrError.totpSecret
			);
		} catch (error) {
			console.log(error);
			return new InternalError();
		}
	}
}
