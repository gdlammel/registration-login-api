import { IGenerateIDProvider } from "@/application/contracts/providers";

export class InMemoryGenerateIDProvider implements IGenerateIDProvider {
	generate(): string {
		return "123";
	}
}
