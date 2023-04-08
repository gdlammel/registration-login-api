import { createTransport } from "nodemailer";

import { IEmailService } from "@/adapters/services";
import { User } from "@/domain/entities";
import { env } from "@/infra/env";

export class NodemailerEmailService implements IEmailService {
	async sendEmail(user: User, token: string): Promise<boolean> {
		try {
			const transport = createTransport({
				host: env.emailHost,
				port: Number(env.emailPort),
				auth: {
					user: env.emailUser,
					pass: env.emailPassword,
				},
			});

			await transport.sendMail({
				from: env.email,
				to: user.email,
				subject: "Password recovery",
				text: `Use this token to create a new password ${token}`,
			});
			return true;
		} catch (error) {
			throw new Error();
		}
	}
}
