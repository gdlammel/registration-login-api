import { CreateUserUseCase } from "@/application/use-cases/create-user";
import { CreateUserController } from "@/infra/controllers";
import {
	BcryptHashPasswordProvider,
	UUIDGenerateIDProvider,
} from "@/infra/providers";
import { DBUserRepository } from "@/infra/repositories/db";
export class CreateUserFactory {
	static create() {
		const userRepository = new DBUserRepository();
		const generateIDProvider = new UUIDGenerateIDProvider();
		const hashPasswordProvider = new BcryptHashPasswordProvider();
		const createUserController = new CreateUserController(
			new CreateUserUseCase(
				userRepository,
				generateIDProvider,
				hashPasswordProvider
			)
		);
		return createUserController;
	}
}
