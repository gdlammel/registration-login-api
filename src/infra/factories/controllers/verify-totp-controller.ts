import { Controller } from "@/adapters/controllers/common";
import { HttpResponse } from "@/adapters/presenters";
import {
	VerifyTotpInputDTO,
	VerifyTotpInteractor,
} from "@/application/verify-totp";
import { ControllerFactory } from "./common";
import { PrismaUserRepository } from "@/infra/repositories/prisma";
import { VerifyTotpGateway } from "@/adapters/gateways";
import { JwtTokenService, OtpLibTotpService } from "@/infra/services";
import { VerifyTotpController } from "@/adapters/controllers";

export class VerifyTotpControllerFactory implements ControllerFactory {
	create(): Controller<VerifyTotpInputDTO, HttpResponse<string>> {
		const userRepository = new PrismaUserRepository();
		const totpService = new OtpLibTotpService();
		const tokenService = new JwtTokenService();
		const verifyTotpGateway = new VerifyTotpGateway(
			userRepository,
			totpService,
			tokenService
		);
		const verifyTotpInteractor = new VerifyTotpInteractor(
			verifyTotpGateway
		);
		return new VerifyTotpController(verifyTotpInteractor);
	}
}
