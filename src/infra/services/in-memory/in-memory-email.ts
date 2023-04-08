import { IEmailService } from "@/adapters/services";
import { User } from "@/domain/entities";

export class InMemoryEmailService implements IEmailService {
	async sendEmail(user: User, token: string): Promise<boolean> {
		return true;
	}
}
