import { ITokenService } from "@/adapters/services";

export class InMemoryTokenService implements ITokenService {
	generateToken(data: Object): string {
		return "abcabc";
	}
}
