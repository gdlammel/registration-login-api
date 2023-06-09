import { describe, it, expect } from "vitest";
import { User, IUserProps, UserDomainError } from "@/domain/entities";

describe("Create user entity", () => {
	it("should be able to create new user", () => {
		const user: IUserProps = {
			id: "1",
			name: "Teste",
			password: "123",
			email: "teste@gmail.com",
			phoneNumber: 12345678,
		} as IUserProps;
		expect(User.create(user)).toBeInstanceOf(User);
	});

	it("should not be able to create new user by passing an invalid email", () => {
		const user: IUserProps = {
			id: "1",
			name: "Teste",
			password: "123",
			email: "fewuhwhweu",
			phoneNumber: 12345678,
		} as IUserProps;

		expect(User.create(user)).toBeInstanceOf(UserDomainError);
	});

	it("should not be able to create new user by passing an invalid phone number", () => {
		const user: IUserProps = {
			id: "1",
			name: "teste",
			password: "123",
			email: "teste@gmail.com",
			phoneNumber: 54385,
		} as IUserProps;

		expect(User.create(user)).toBeInstanceOf(UserDomainError);
	});
});
