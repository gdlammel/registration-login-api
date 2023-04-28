import crypto from "node:crypto";

export interface IUserProps {
	id: string;
	name: string;
	password: string;
	email: string;
	phoneNumber: number;
	totpSecret: string;
}

export interface ICreateUserProps {
	id: string;
	name: string;
	password: string;
	email: string;
	phoneNumber: number;
	totpSecret?: string;
}

export class UserDomainError extends Error {
	constructor() {
		super("Error creating new user");
	}
}

export class User {
	private props: IUserProps;
	get id() {
		return this.props.id;
	}

	get name() {
		return this.props.name;
	}

	get password() {
		return this.props.password;
	}

	get email() {
		return this.props.email;
	}

	get phoneNumber() {
		return this.props.phoneNumber;
	}

	get totpSecret() {
		return this.props.totpSecret;
	}

	private constructor({
		id,
		name,
		password,
		email,
		phoneNumber,
		totpSecret,
	}: IUserProps) {
		this.props = { id, name, password, email, phoneNumber, totpSecret };
	}

	private static generateRandomTotpSecret(length = 16) {
		const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
		let secret = "";

		for (let i = 0; i < length; i++) {
			const randomIndex = crypto.randomInt(0, chars.length);
			secret += chars[randomIndex];
		}

		return secret;
	}

	public static create(userProps: ICreateUserProps): User | UserDomainError {
		const isPhoneNumberValidated = User.validatePhoneNumber(
			String(userProps.phoneNumber)
		);
		const isEmailValidated = this.validateEmail(userProps.email);
		if (!isPhoneNumberValidated || !isEmailValidated) {
			return new UserDomainError();
		}
		if (!userProps.totpSecret) {
			const totpSecret = this.generateRandomTotpSecret();
			return new User({ ...userProps, totpSecret });
		}
		return new User({
			id: userProps.id,
			name: userProps.name,
			password: userProps.password,
			email: userProps.email,
			phoneNumber: userProps.phoneNumber,
			totpSecret: userProps.totpSecret,
		});
	}

	private static validatePhoneNumber(phoneNumber: string) {
		const regexExpression =
			/^\s*(\d{2}|\d{0})[-. ]?(\d{5}|\d{4})[-. ]?(\d{4})[-. ]?\s*$/;
		const validate = regexExpression.test(phoneNumber);
		return validate;
	}

	private static validateEmail(email: string) {
		const regexExpression = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
		const validate = regexExpression.test(email);
		return validate;
	}
}
