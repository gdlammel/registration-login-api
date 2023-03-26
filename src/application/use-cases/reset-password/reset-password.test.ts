import { describe, expect, it } from "vitest";
import {
	ResetPasswordUseCase,
	ResetPasswordInputDTO,
} from "@/application/use-cases/reset-password";
import { MissingInformationError } from "@/application/use-cases/reset-password/errors";
import { UserNotFoundError } from "@/application/use-cases/authenticate-user/errors/user-not-found";
import { InMemoryUserRepository } from "@/infra/repositories/in-memory";
import { IUserProps, User } from "@/domain/entities";

describe("Reset password use case", () => {
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
			const repo = new InMemoryUserRepository([userRegistered]);
			const sut = new ResetPasswordUseCase(repo);
			const response = await sut.execute(inputData);
			expect(response).toBe(true);
		}
	});
	it("Should be able return a MissingInformartionError when not passing all the information", async () => {
		const inputData = {
			newPassword: "new_password",
		};
		const repo = new InMemoryUserRepository([]);
		const sut = new ResetPasswordUseCase(repo);
		const response = await sut.execute(inputData as ResetPasswordInputDTO);
		expect(response).toBeInstanceOf(MissingInformationError);
	});
	it("Should no be able to update password with invalid user", async () => {
		const inputData: ResetPasswordInputDTO = {
			id: "123",
			newPassword: "new_password",
		};
		const repo = new InMemoryUserRepository([]);
		const sut = new ResetPasswordUseCase(repo);
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
			const repo = new InMemoryUserRepository([userRegistered]);
			const sut = new ResetPasswordUseCase(repo);
			const response = await sut.execute(inputData);
			expect(response).toBe(true);
			expect(repo.getUpdatedUser()[0].id).toEqual(inputData.id);
			expect(repo.getUpdatedUser()[0].password).toEqual(
				inputData.newPassword
			);
		}
	});
});
