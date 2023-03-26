import { CreateUserUseCase } from "@/application/use-cases/create-user";
import { CreateUserController } from "@/infra/controllers";
import {
	InMemoryGenerateIDProvider,
	InMemoryHashPasswordProvider,
} from "@/infra/providers/in-memory";
import { InMemoryUserRepository } from "@/infra/repositories";

const userRepository = new InMemoryUserRepository([]);
const generateIDProvider = new InMemoryGenerateIDProvider();
const hashPasswordProvider = new InMemoryHashPasswordProvider();

const useCase = new CreateUserUseCase(
	userRepository,
	generateIDProvider,
	hashPasswordProvider
);

const createUserController = new CreateUserController(useCase);

export { createUserController };
