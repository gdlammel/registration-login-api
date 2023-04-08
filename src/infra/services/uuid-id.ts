import { v4 as uuid } from "uuid";

import { IIdService } from "@/adapters/services";

export class UuidIdService implements IIdService {
	generateId(): string {
		const id = uuid();
		return id;
	}
}
