import { User } from "@/domain/entities";

export interface IEmailService {
	sendEmail(user: User, token: string): Promise<boolean>;
}
