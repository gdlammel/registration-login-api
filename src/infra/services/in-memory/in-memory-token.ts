import { ITokenService } from "@/adapters/services";

export class InMemoryTokenService implements ITokenService {
	generateToken(): string {
		return "abcabc";
	}
}
