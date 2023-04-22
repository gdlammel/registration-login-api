import { CreateUserInteractor } from "@/application/create-user";
import { CreateUserGateway } from "@/adapters/gateways/create-user";
import {
	CreateUserController,
	CreateUserRequestDTO,
} from "@/adapters/controllers";
import { BcryptHashService, UuidIdService } from "@/infra/services";
import { PrismaUserRepository } from "@/infra/repositories/prisma";
import { ControllerFactory } from "@/infra/factories/controllers/common";
import { Controller } from "@/adapters/controllers/common";
import { HttpResponse } from "@/adapters/presenters";
export class CreateUserControllerFactory implements ControllerFactory {
	create(): Controller<CreateUserRequestDTO, HttpResponse<string>> {
		const userRepository = new PrismaUserRepository();
		const IdService = new UuidIdService();
		const hashService = new BcryptHashService();
		const createUserGateway = new CreateUserGateway(
			userRepository,
			IdService,
			hashService
		);
		const createUserInteractor = new CreateUserInteractor(
			createUserGateway
		);
		return new CreateUserController(createUserInteractor);
	}
}
