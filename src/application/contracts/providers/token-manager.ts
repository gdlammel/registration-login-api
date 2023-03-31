export interface ITokenManagerProvider {
	generate(data: Object): string;
	generateForgotPassword(data: Object): string;
}
