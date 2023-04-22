import { describe, expect, it } from "vitest";

import {
	ResetPasswordInteractor,
	ResetPasswordInputDTO,
} from "@/application/reset-password";
import { MissingInformationError } from "@/application/reset-password/errors";
import { UserNotFoundError } from "@/application/common/errors";
import { InMemoryUserRepository } from "@/infra/repositories/in-memory";
import { IUserProps, User } from "@/domain/entities";
import { ResetPasswordGateway } from "@/adapters/gateways";
import { InMemoryHashService } from "@/infra/services/in-memory";

describe("Reset password use case", () => {
	type CreateSutReturn = [ResetPasswordInteractor, InMemoryUserRepository];

	function createSut(userRegistered?: User): CreateSutReturn {
		const repository = new InMemoryUserRepository(
			userRegistered ? [userRegistered] : []
		);
		const hashService = new InMemoryHashService();
		const gateway = new ResetPasswordGateway(repository, hashService);
		return [new ResetPasswordInteractor(gateway), repository];
	}

	it("Should be able to return success message when passing all correct data", async () => {
		const userRegisteredInfos: IUserProps = {
			id: "123",
			name: "teste",
			password: "123",
			email: "teste@teste.com",
			phoneNumber: 1112345678,
		};

		const userRegistered = User.create(userRegisteredInfos);
		if (userRegistered instanceof User) {
			const inputData: ResetPasswordInputDTO = {
				id: "123",
				newPassword: "new_password",
			};
			const [sut] = createSut(userRegistered);
			const response = await sut.execute(inputData);
			expect(response).toBe(true);
		}
	});
	it("Should be able return a MissingInformartionError when not passing all the information", async () => {
		const inputData = {
			newPassword: "new_password",
		};
		const [sut] = createSut();
		const response = await sut.execute(inputData as ResetPasswordInputDTO);
		expect(response).toBeInstanceOf(MissingInformationError);
	});
	it("Should no be able to update password with invalid user", async () => {
		const inputData: ResetPasswordInputDTO = {
			id: "123",
			newPassword: "new_password",
		};
		const [sut] = createSut();
		const response = await sut.execute(inputData);
		expect(response).toBeInstanceOf(UserNotFoundError);
	});
	it("Should be able to update a user password", async () => {
		const userRegisteredInfos: IUserProps = {
			id: "123",
			name: "teste",
			password: "123",
			email: "teste@teste.com",
			phoneNumber: 1112345678,
		};

		const userRegistered = User.create(userRegisteredInfos);
		if (userRegistered instanceof User) {
			const inputData: ResetPasswordInputDTO = {
				id: "123",
				newPassword: "new_password",
			};
			const [sut, repository] = createSut(userRegistered);
			const response = await sut.execute(inputData);
			expect(response).toBe(true);
			expect(repository.getUpdatedUser()[0].id).toEqual(inputData.id);
			expect(repository.getUpdatedUser()[0].password).toEqual(
				inputData.newPassword
			);
		}
	});
});
