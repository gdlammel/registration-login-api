import { ITokenManagerProvider } from "@/application/contracts/providers";
import { env } from "@/main/config";
import { User } from "@/domain/entities";
import { sign } from "jsonwebtoken";

export class JwtTokenMangerProvider implements ITokenManagerProvider {
	generate(data: User): string {
		const token = sign({ id: data.id }, env.secret, {
			subject: data.id,
			expiresIn: env.expiresIn,
		});

		return token;
	}
}
