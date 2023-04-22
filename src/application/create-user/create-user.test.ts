import { describe, expect, it } from "vitest";
import { IUserProps, User } from "@/domain/entities";
import { InMemoryUserRepository } from "@/infra/repositories/in-memory";
import { CreateUserGateway } from "@/adapters/gateways";
import {
	InMemoryIdService,
	InMemoryHashService,
} from "@/infra/services/in-memory";
import {
	CreateUserInteractor,
	CreateUserInputDTO,
} from "@/application/create-user";

import { EmailAlreadyRegisteredError } from "@/application/create-user/errors";

describe("Create user use case", () => {
	type createSutReturn = [CreateUserInteractor, InMemoryUserRepository];

	function createSut(userRegistered?: User): createSutReturn {
		const repository = new InMemoryUserRepository(
			userRegistered ? [userRegistered] : []
		);
		const idService = new InMemoryIdService();
		const hashService = new InMemoryHashService();
		const gateway = new CreateUserGateway(
			repository,
			idService,
			hashService
		);
		return [new CreateUserInteractor(gateway), repository];
	}
	it("Should be able to create new user with all correct informations", async () => {
		const [sut, repository] = createSut();
		const sutInput: CreateUserInputDTO = {
			name: "Teste",
			email: "teste@gmail.com",
			password: "123",
			phoneNumber: 5412345678,
		};
		const success = await sut.execute(sutInput);
		expect(repository.getTimesSaveCalled()).toBe(1);
		expect(success).toBeTruthy();
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
			const [sut] = createSut(userRegistered);

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
