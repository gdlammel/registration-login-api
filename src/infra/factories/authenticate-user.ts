import { AuthenticateUserInteractor } from "@/application/authenticate-user";
import { AuthenticateUserGateway } from "@/adapters/gateways";
import { AuthenticateUserController } from "@/adapters/controllers";
import { BcryptHashService, JwtTokenService } from "@/infra/services";
import { PrismaUserRepository } from "@/infra/repositories/prisma";

export class AuthenticateUserFactory {
	static create() {
		const userRepository = new PrismaUserRepository();
		const hashService = new BcryptHashService();
		const tokenService = new JwtTokenService();
		const authenticateUserGateway = new AuthenticateUserGateway(
			userRepository,
			hashService,
			tokenService
		);
		const authenticateUserInteractor = new AuthenticateUserInteractor(
			authenticateUserGateway
		);
		return new AuthenticateUserController(authenticateUserInteractor);
	}
}
