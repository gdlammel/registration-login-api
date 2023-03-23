import { IGenerateIDProvider } from "@/application/contracts/providers";

export class InMemoryGenerateIDProvider implements IGenerateIDProvider {
	async generate(): Promise<string> {
		return "123";
	}
}
