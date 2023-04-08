import { compare, hash as hashPassword } from "bcryptjs";

import { IHashService } from "@/adapters/services";

export class BcryptHashService implements IHashService {
	async compare(
		inputPassword: string,
		userPassword: string
	): Promise<boolean> {
		const result = await compare(inputPassword, userPassword);
		return result;
	}
	hash(password: string): Promise<string> {
		const hashedPassword = hashPassword(password, 8);
		return hashedPassword;
	}
}
