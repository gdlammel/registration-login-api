export interface ITokenService {
	generateToken(data: object, secret?: string, expiresIn?: string): string;
}
