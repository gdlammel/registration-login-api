import { ITotpService, ITokenService } from "@/adapters/services";
import { IUserRepository } from "@/adapters/repositories";
import { User } from "@/domain/entities";
import { IVerifyTotpGateway } from "@/application/verify-totp";

export class VerifyTotpGateway implements IVerifyTotpGateway {
	constructor(
		private userRepository: IUserRepository,
		private totpService: ITotpService,
		private tokenService: ITokenService
	) {}
	async findUserByID(id: string): Promise<User | null> {
		return await this.userRepository.findUserByID(id);
	}
	verifyOtp(token: string, secret: string): boolean {
		return this.totpService.verifyTotp(token, secret);
	}
	generateToken(data: object, secret?: string, expiresIn?: string): string {
		return this.tokenService.generateToken(data, secret, expiresIn);
	}
}
