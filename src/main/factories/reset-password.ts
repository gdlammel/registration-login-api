import { ResetPasswordUseCase } from "@/application/use-cases/reset-password";
import { ResetPasswordController } from "@/infra/controllers";
import { BcryptHashPasswordProvider } from "@/infra/providers";
import { DBUserRepository } from "@/infra/repositories/db";

export class ResetPasswordFactory {
	static create() {
		const userRepository = new DBUserRepository();
		const hashPasswordProvider = new BcryptHashPasswordProvider();
		const resetPasswordUseCase = new ResetPasswordUseCase(
			userRepository,
			hashPasswordProvider
		);
		const resetPasswordController = new ResetPasswordController(
			resetPasswordUseCase
		);
		return resetPasswordController;
	}
}
