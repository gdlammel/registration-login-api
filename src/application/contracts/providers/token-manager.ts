export interface ITokenManagerProvider {
	generate(data: Object): string;
	verify(token: string): Object;
}
