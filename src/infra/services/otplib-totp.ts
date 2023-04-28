import { authenticator } from "otplib";

import { ITotpService } from "@/adapters/services";

export class OtpLibTotpService implements ITotpService {
	verifyTotp(token: string, secret: string): boolean {
		return authenticator.check(token, secret);
	}
	generateTotpSeed(name: string, secret: string): string {
		return authenticator.keyuri(name, "registration-login-api", secret);
	}
}
