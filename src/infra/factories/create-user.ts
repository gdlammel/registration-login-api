import {CreateUserInteractor} from "@/application/create-user";
import {CreateUserGateway} from "@/adapters/gateways/create-user"
import { CreateUserController } from "@/adapters/controllers";
import {
	BcryptHashService,
	UuidIdService,
} from "@/infra/services";
import { PrismaUserRepository } from "@/infra/repositories/prisma";
export class CreateUserFactory {
	static create() {
		const userRepository = new PrismaUserRepository();
		const generateIDProvider = new UuidIdService();
		const hashPasswordProvider = new BcryptHashService();
		const createUserGateway = new CreateUserGateway(userRepository, generateIDProvider, hashPasswordProvider);
		const createUserInteractor = new CreateUserInteractor(createUserGateway);
		return new CreateUserController(createUserInteractor);
	}
}
