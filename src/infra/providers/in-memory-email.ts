import { IEmailProvider } from "@/application/contracts/providers";
import { User } from "@/domain/entities";

export class InMemoryEmailProvider implements IEmailProvider {
	async sendEmail(user: User, token: string): Promise<boolean> {
		return true;
	}
}
