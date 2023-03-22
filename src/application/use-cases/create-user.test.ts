import { describe, expect, it } from "vitest";
import { IUserProps, User } from "@/domain/entities";
import { InMemoryUserRepository } from "@/infra/repositories";
import {
	InMemoryGenerateIDProvider,
	InMemoryHashPasswordProvider,
} from "@/infra/providers";
import {
	CreateUserUseCase,
	CreateUserInputDTO,
	EmailAlreadyRegisteredError,
} from "@/application/use-cases";

describe("Create user use case", () => {
	it("Should be able to create new user with all correct informations", async () => {
		const repo = new InMemoryUserRepository([]);
		const idProvider = new InMemoryGenerateIDProvider();
		const hashPasswordProvider = new InMemoryHashPasswordProvider();
		const sut = new CreateUserUseCase(
			repo,
			idProvider,
			hashPasswordProvider
		);
		const sutInput: CreateUserInputDTO = {
			name: "Teste",
			email: "teste@gmail.com",
			password: "123",
			phoneNumber: 5412345678,
		};
		const createdUser = await sut.execute(sutInput);
		expect(createdUser).toBeInstanceOf(User);
		expect(repo.getTimesSaveCalled()).toBe(1);
	});

	it("Should not be able to create new user with email already registered", async () => {
		const userRegisteredInfos: IUserProps = {
			id: "1",
			name: "teste",
			password: "123",
			email: "teste@gmail.com",
			phoneNumber: 1112345678,
		};

		const userRegistered = User.create(userRegisteredInfos);

		if (userRegistered instanceof User) {
			const repo = new InMemoryUserRepository([userRegistered]);
			const idProvider = new InMemoryGenerateIDProvider();
			const hashPasswordProvider = new InMemoryHashPasswordProvider();
			const sut = new CreateUserUseCase(
				repo,
				idProvider,
				hashPasswordProvider
			);

			const sutInput: CreateUserInputDTO = {
				name: "teste2",
				password: "12345",
				email: "teste@gmail.com",
				phoneNumber: 5412345678,
			};

			expect(await sut.execute(sutInput)).toBeInstanceOf(
				EmailAlreadyRegisteredError
			);
		}
	});
});
