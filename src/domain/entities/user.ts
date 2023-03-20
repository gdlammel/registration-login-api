export interface IUserProps {
	id: string;
	name: string;
	password: string;
	email: string;
	phoneNumber: number;
}

class UserError extends Error {
	constructor() {
		super("Failed while create new user");
	}
}

export class User {
	private props: IUserProps;

	get name() {
		return this.props.name;
	}

	get email() {
		return this.props.email;
	}

	private constructor({
		id,
		name,
		password,
		email,
		phoneNumber,
	}: IUserProps) {
		this.props = { id, name, password, email, phoneNumber };
	}

	public static create(userProps: IUserProps): User {
		try {
			const isPhoneNumberValidated = User.validatePhoneNumber(
				String(userProps.phoneNumber)
			);
			const isEmailValidated = this.validateEmail(userProps.email);

			if (!isPhoneNumberValidated || !isEmailValidated) {
				throw Error();
			}
			return new User(userProps);
		} catch (error) {
			throw new UserError();
		}
	}

	private static validatePhoneNumber(phoneNumber: string) {
		const regexExpression =
			/^\s*(\d{2}|\d{0})[-. ]?(\d{5}|\d{4})[-. ]?(\d{4})[-. ]?\s*$/;
		const validate = regexExpression.test(phoneNumber);
		return validate;
	}

	private static validateEmail(email: string) {
		const regexExpression = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		const validate = regexExpression.test(email);
		return validate;
	}
}
