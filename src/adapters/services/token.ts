export interface ITokenService {
	generateToken(data: Object, secret?: string): string;
}
