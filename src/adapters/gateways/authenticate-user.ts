import { IAuthenticateUserGateway } from "@/application/authenticate-user";
import { IUserRepository } from "@/adapters/repositories";
import { IHashService, ITokenService } from "@/adapters/services";
import { User } from "@/domain/entities";

export class AuthenticateUserGateway implements IAuthenticateUserGateway {
	constructor(
		private userRepository: IUserRepository,
		private hashService: IHashService,
		private tokenService: ITokenService
	) {}
	async findUserByEmail(email: string): Promise<User | null> {
		return this.userRepository.findUserByEmail(email);
	}
	async compare(
		inputPassword: string,
		userPassword: string
	): Promise<boolean> {
		return this.hashService.compare(inputPassword, userPassword);
	}
	generateToken(data: Object, secret?: string): string {
		return this.tokenService.generateToken(data, secret);
	}
}
