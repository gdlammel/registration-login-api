export interface IHashPasswordProvider {
	hash(password: string): Promise<string>;
	compare(inputPassword: string, userPassword: string): Promise<boolean>;
}
