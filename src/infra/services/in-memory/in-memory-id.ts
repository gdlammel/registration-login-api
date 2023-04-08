import { IIdService } from "@/adapters/services";

export class InMemoryIdService implements IIdService {
	generateId(): string {
		return "123";
	}
}
