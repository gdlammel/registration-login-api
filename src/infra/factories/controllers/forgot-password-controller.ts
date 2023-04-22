import { ForgotPasswordGateway } from "@/adapters/gateways";
import { ForgotPasswordInteractor } from "@/application/forgot-password";
import {
	ForgotPasswordController,
	ForgotPasswordRequestDTO,
} from "@/adapters/controllers";
import { JwtTokenService, NodemailerEmailService } from "@/infra/services";
import { PrismaUserRepository } from "@/infra/repositories/prisma";
import { ControllerFactory } from "@/infra/factories/controllers/common";
import { Controller } from "@/adapters/controllers/common";
import { HttpResponse } from "@/adapters/presenters";

export class ForgotPasswordControllerFactory implements ControllerFactory {
	create(): Controller<ForgotPasswordRequestDTO, HttpResponse<string>> {
		const userRepository = new PrismaUserRepository();
		const tokenService = new JwtTokenService();
		const emailService = new NodemailerEmailService();
		const forgotPasswordGateway = new ForgotPasswordGateway(
			userRepository,
			tokenService,
			emailService
		);
		const forgotPasswordInteractor = new ForgotPasswordInteractor(
			forgotPasswordGateway
		);
		return new ForgotPasswordController(forgotPasswordInteractor);
	}
}
