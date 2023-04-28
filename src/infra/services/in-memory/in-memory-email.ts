import { IEmailService } from "@/adapters/services";

export class InMemoryEmailService implements IEmailService {
	async sendEmail(): Promise<boolean> {
		return true;
	}
}
