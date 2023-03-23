import { IHashPasswordProvider } from "@/application/contracts/providers";

export class InMemoryHashPasswordProvider implements IHashPasswordProvider {
	async hash(password: string): Promise<string> {
		return "abc";
	}
	async compare(
		inputPassword: string,
		userPassword: string
	): Promise<boolean> {
		if (inputPassword === userPassword) {
			return true;
		}
		return false;
	}
}
