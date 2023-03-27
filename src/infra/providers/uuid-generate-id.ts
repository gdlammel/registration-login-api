import { IGenerateIDProvider } from "@/application/contracts/providers";
import { v4 as uuid } from "uuid";

export class UUIDGenerateIDProvider implements IGenerateIDProvider {
	generate(): string {
		const id = uuid();
		return id;
	}
}
