import { ForgotPasswordUseCase } from "@/application/use-cases/forgot-password";
import { ForgotPasswordController } from "@/infra/controllers";
import { NodemailerEmailProvider } from "@/infra/providers";
import { JwtTokenMangerProvider } from "@/infra/providers/jwt-token-manager";
import { DBUserRepository } from "@/infra/repositories/db";

export class ForgotPasswordFactory {
	static create() {
		const userRepository = new DBUserRepository();
		const jwtTokenProvider = new JwtTokenMangerProvider();
		const nodemailerEmailProvider = new NodemailerEmailProvider();
		const forgotPasswordUseCase = new ForgotPasswordUseCase(
			userRepository,
			jwtTokenProvider,
			nodemailerEmailProvider
		);
		const forgotPasswordController = new ForgotPasswordController(
			forgotPasswordUseCase
		);
		return forgotPasswordController;
	}
}
