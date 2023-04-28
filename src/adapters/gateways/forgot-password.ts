import { IForgotPasswordGateway } from "@/application/forgot-password";
import { User } from "@/domain/entities";
import { IUserRepository } from "@/adapters/repositories";
import { IEmailService, ITokenService } from "@/adapters/services";

export class ForgotPasswordGateway implements IForgotPasswordGateway {
	constructor(
		private userRepository: IUserRepository,
		private tokenService: ITokenService,
		private emailService: IEmailService
	) {}
	async findUserByEmail(email: string): Promise<User | null> {
		return this.userRepository.findUserByEmail(email);
	}
	generateToken(data: object, secret?: string, expiresIn?: string): string {
		return this.tokenService.generateToken(data, secret, expiresIn);
	}
	async sendEmail(user: User, token: string): Promise<boolean> {
		return this.emailService.sendEmail(user, token);
	}
}
