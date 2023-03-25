import { IUserProps, User } from "@/domain/entities";
import { InMemoryEmailProvider, InMemoryTokenManager } from "@/infra/providers";
import { InMemoryUserRepository } from "@/infra/repositories";
import { describe, expect, it } from "vitest";
import { EmailNotFoundError } from "@/application/use-cases/forgot-password/errors";
import { ForgotPasswordUseCase } from "@/application/use-cases/forgot-password";

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
			const repo = new InMemoryUserRepository([userRegistered]);
			const tokenManagerProvider = new InMemoryTokenManager();
			const emailProvider = new InMemoryEmailProvider();
			const sut = new ForgotPasswordUseCase(
				repo,
				tokenManagerProvider,
				emailProvider
			);
			const result = await sut.execute({ email: "teste@teste.com" });
			expect(result).toBe(true);
		}
	});

	it("Must have a email not found error return", async () => {
		const repo = new InMemoryUserRepository([]);
		const tokenManagerProvider = new InMemoryTokenManager();
		const emailProvider = new InMemoryEmailProvider();
		const sut = new ForgotPasswordUseCase(
			repo,
			tokenManagerProvider,
			emailProvider
		);
		const result = await sut.execute({ email: "teste@teste.com" });
		expect(result).toBeInstanceOf(EmailNotFoundError);
	});
});
