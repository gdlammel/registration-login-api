import { IHashService } from "@/adapters/services";

export class InMemoryHashService implements IHashService {
	async hash(password: string): Promise<string> {
		return password;
	}
	async compare(
		inputPassword: string,
		userPassword: string
	): Promise<boolean> {
		return inputPassword === userPassword
	}
}
