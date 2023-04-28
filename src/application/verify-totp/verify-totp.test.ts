import { describe, expect, it } from "vitest";
import {
	VerifyTotpInputDTO,
	VerifyTotpInteractor,
} from "@/application/verify-totp";
import { VerifyTotpGateway } from "@/adapters/gateways";
import { InMemoryUserRepository } from "@/infra/repositories/in-memory";
import {
	InMemoryTotpService,
	InMemoryTokenService,
} from "@/infra/services/in-memory";
import { UserNotFoundError } from "@/application/common/errors";
import { IUserProps, User } from "@/domain/entities";
import { UnmatchTotpError } from "@/application/verify-totp/errors";

describe("Verify totp use case", () => {
	function createSut(userRegistered?: User) {
		const repository = new InMemoryUserRepository(
			userRegistered ? [userRegistered] : []
		);
		const totpService = new InMemoryTotpService();
		const tokenService = new InMemoryTokenService();
		const gateway = new VerifyTotpGateway(
			repository,
			totpService,
			tokenService
		);
		return new VerifyTotpInteractor(gateway);
	}
	it("Should be able return UserNotFoundError when passed a invalid id", async () => {
		const sut = createSut();
		expect(
			await sut.execute({ totp: "123454" } as VerifyTotpInputDTO)
		).toBeInstanceOf(UserNotFoundError);
	});

	it("Should be able return UnmatchTotpError when passed a different totp", async () => {
		const userRegisteredInfos: IUserProps = {
			id: "123",
			name: "teste",
			password: "123",
			email: "teste@teste.com",
			phoneNumber: 1112345678,
		};

		const userRegistered = User.create(userRegisteredInfos);
		if (userRegistered instanceof User) {
			const inputData: VerifyTotpInputDTO = {
				id: "123",
				totp: "132456",
			};
			const sut = createSut(userRegistered);
			expect(await sut.execute(inputData)).toBeInstanceOf(
				UnmatchTotpError
			);
		}
	});

	it("Should be able return jwt token when passed all correct information", async () => {
		const userRegisteredInfos: IUserProps = {
			id: "123",
			name: "teste",
			password: "123",
			email: "teste@teste.com",
			phoneNumber: 1112345678,
		};

		const userRegistered = User.create(userRegisteredInfos);
		if (userRegistered instanceof User) {
			const inputData: VerifyTotpInputDTO = {
				id: "123",
				totp: "123456",
			};
			const sut = createSut(userRegistered);
			expect(await sut.execute(inputData)).toBe("abcabc");
		}
	});
});
