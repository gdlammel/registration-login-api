import { User } from "@/domain/entities";

export interface IEmailProvider {
	sendEmail(user: User, token: string): Promise<boolean>;
}
