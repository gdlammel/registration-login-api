export class UnmatchTotpError extends Error {
	constructor() {
		super("Unmatch totp");
	}
}
