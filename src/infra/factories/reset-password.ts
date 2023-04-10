import { ResetPasswordInteractor } from "@/application/reset-password";
import { ResetPasswordController } from "@/adapters/controllers";
import { BcryptHashService } from "@/infra/services";
import { PrismaUserRepository } from "@/infra/repositories/prisma";
import {ResetPasswordGateway} from "@/adapters/gateways";

export class ResetPasswordFactory {
	static create() {
		const userRepository = new PrismaUserRepository();
		const hashService = new BcryptHashService();
		const resetPasswordGateway = new ResetPasswordGateway(userRepository, hashService)
		const resetPasswordInteractor = new ResetPasswordInteractor(resetPasswordGateway);
		return new ResetPasswordController(resetPasswordInteractor);
	}
}
