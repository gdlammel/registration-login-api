import { describe, expect, it } from "vitest";

import { IUserProps, User } from "@/domain/entities";
import { InMemoryUserRepository } from "@/infra/repositories/in-memory";
import { EmailNotFoundError } from "@/application/forgot-password/errors";
import { ForgotPasswordInteractor } from "@/application/forgot-password";
import {
	InMemoryEmailService,
	InMemoryTokenService,
} from "@/infra/services/in-memory";
import { ForgotPasswordGateway } from "@/adapters/gateways/forgot-password";

describe("Forgot password use case", () => {
	it("Must have a successful return", async () => {
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
			const tokenService = new InMemoryTokenService();
			const emailService = new InMemoryEmailService();
			const gateway = new ForgotPasswordGateway(
				repository,
				tokenService,
				emailService
			);
			const sut = new ForgotPasswordInteractor(gateway);
			const result = await sut.execute({ email: "teste@teste.com" });
			expect(result).toBe(true);
		}
	});

	it("Must have a email not found error return", async () => {
		const repository = new InMemoryUserRepository([]);
		const tokenService = new InMemoryTokenService();
		const emailService = new InMemoryEmailService();
		const gateway = new ForgotPasswordGateway(
			repository,
			tokenService,
			emailService
		);
		const sut = new ForgotPasswordInteractor(gateway);
		const result = await sut.execute({ email: "teste@teste.com" });
		expect(result).toBeInstanceOf(EmailNotFoundError);
	});
});
