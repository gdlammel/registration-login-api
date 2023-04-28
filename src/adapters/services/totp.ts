export interface ITotpService {
	verifyTotp(token: string, secret?: string): boolean;
	generateTotpSeed(name: string, secret: string): string;
}
