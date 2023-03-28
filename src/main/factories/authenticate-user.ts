import { AuthenticateUserUseCase } from "@/application/use-cases/authenticate-user";
import { AuthenticateUserController } from "@/infra/controllers/authenticate-user";
import { BcryptHashPasswordProvider } from "@/infra/providers";
import { JwtTokenMangerProvider } from "@/infra/providers/jwt-token-manager";
import { DBUserRepository } from "@/infra/repositories/db";

export class AuthenticateUserFactory {
	static create() {
		const userRepository = new DBUserRepository();
		const hashPasswordProvider = new BcryptHashPasswordProvider();
		const tokenMangerProvider = new JwtTokenMangerProvider();
		const authenticateUserUseCase = new AuthenticateUserUseCase(
			userRepository,
			hashPasswordProvider,
			tokenMangerProvider
		);
		const authenticateUserController = new AuthenticateUserController(
			authenticateUserUseCase
		);
		return authenticateUserController;
	}
}
