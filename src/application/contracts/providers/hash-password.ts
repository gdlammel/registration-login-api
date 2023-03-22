export interface IHashPasswordProvider {
	hash(password: string): Promise<string>;
}
