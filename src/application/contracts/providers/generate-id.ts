export interface IGenerateIDProvider {
	generate(): Promise<string>;
}
