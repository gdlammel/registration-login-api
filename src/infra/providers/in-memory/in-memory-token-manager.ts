import { ITokenManagerProvider } from "@/application/contracts/providers";

export class InMemoryTokenManager implements ITokenManagerProvider {
	generate(data: Object): string {
		return "abcabc";
	}
	verify(token: string): Object {
		throw new Error("Method not implemented.");
	}
}
