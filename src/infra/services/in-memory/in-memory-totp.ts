import { ITotpService } from "@/adapters/services";

export class InMemoryTotpService implements ITotpService {
	verifyTotp(token: string): boolean {
		return token === "123456" ? true : false;
	}
	generateTotpSeed(): string {
		return "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	}
}
