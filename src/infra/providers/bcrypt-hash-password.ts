import { compare, hash as hashPassword } from "bcryptjs";
import { IHashPasswordProvider } from "@/application/contracts/providers";

export class BcryptHashPasswordProvider implements IHashPasswordProvider {
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
