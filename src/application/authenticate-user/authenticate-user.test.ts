import { describe, expect, it } from "vitest";
import { InMemoryUserRepository } from "@/infra/repositories/in-memory";
import { AuthenticateUserInteractor } from "@/application/authenticate-user";
import { IUserProps, User } from "@/domain/entities/user";
import { UnmatchPasswordError } from "@/application/authenticate-user/errors";
import { UserNotFoundError } from "@/application/common/errors";
import {
	InMemoryHashService,
	InMemoryTokenService,
} from "@/infra/services/in-memory";
import { AuthenticateUserGateway } from "@/adapters/gateways";

describe("Authenticate user use case", () => {
	it("Should be able to authenticate user with all correct informations", async () => {
		const userRegisteredInfos: IUserProps = {
			id: "1",
			name: "teste",
			password: "123",
			email: "teste@teste.com",
			phoneNumber: 1112345678,
		};

		const userRegistered = User.create(userRegisteredInfos);

		if (userRegistered instanceof User) {
			const repository = new InMemoryUserRepository([userRegistered]);
			const hashService = new InMemoryHashService();
			const tokenService = new InMemoryTokenService();
			const gateway = new AuthenticateUserGateway(
				repository,
				hashService,
				tokenService
			);
			const sut = new AuthenticateUserInteractor(gateway);
			const result = await sut.execute({
				email: "teste@teste.com",
				password: "123",
			});

			expect(result).toBe("abcabc");
		}
	});

	it("Should not be able to authenticate user with a not registered email", async () => {
		const userRegisteredInfos: IUserProps = {
			id: "1",
			name: "teste",
			password: "123",
			email: "teste@gmail.com",
			phoneNumber: 1112345678,
		};

		const userRegistered = User.create(userRegisteredInfos);

		if (userRegistered instanceof User) {
			const repository = new InMemoryUserRepository([userRegistered]);
			const hashService = new InMemoryHashService();
			const tokenService = new InMemoryTokenService();
			const gateway = new AuthenticateUserGateway(
				repository,
				hashService,
				tokenService
			);
			const sut = new AuthenticateUserInteractor(gateway);
			const result = await sut.execute({
				email: "teste45@teste.com",
				password: "123",
			});
			expect(result).toBeInstanceOf(UserNotFoundError);
		}
	});

	it("Should no be able to authenticate user with unmatch password", async () => {
		const userRegisteredInfos: IUserProps = {
			id: "1",
			name: "teste",
			password: "123",
			email: "teste@teste.com",
			phoneNumber: 1112345678,
		};

		const userRegistered = User.create(userRegisteredInfos);

		if (userRegistered instanceof User) {
			const repository = new InMemoryUserRepository([userRegistered]);
			const hashService = new InMemoryHashService();
			const tokenService = new InMemoryTokenService();
			const gateway = new AuthenticateUserGateway(
				repository,
				hashService,
				tokenService
			);
			const sut = new AuthenticateUserInteractor(gateway);
			const result = await sut.execute({
				email: "teste@teste.com",
				password: "12345",
			});
			expect(result).toBeInstanceOf(UnmatchPasswordError);
		}
	});
});
