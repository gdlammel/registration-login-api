import { AuthenticateUserInteractor } from "@/application/authenticate-user";
import { AuthenticateUserGateway } from "@/adapters/gateways";
import {
	AuthenticateUserController,
	AuthenticateUserRequestDTO,
} from "@/adapters/controllers";
import { BcryptHashService, JwtTokenService } from "@/infra/services";
import { PrismaUserRepository } from "@/infra/repositories/prisma";
import { ControllerFactory } from "@/infra/factories/controllers/common";
import { Controller } from "@/adapters/controllers/common";
import { HttpResponse } from "@/adapters/presenters";

export class AuthenticateUserControllerFactory implements ControllerFactory {
	create(): Controller<AuthenticateUserRequestDTO, HttpResponse<string>> {
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
