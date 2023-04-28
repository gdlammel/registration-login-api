import { sign } from "jsonwebtoken";

import { ITokenService } from "@/adapters/services";
import { env } from "@/infra/env";
import { User } from "@/domain/entities";

export class JwtTokenService implements ITokenService {
	generateToken(
		data: User,
		secret: string = env.secret,
		expiresIn: string = env.expiresIn
	): string {
		const token = sign({ id: data.id }, secret, {
			subject: data.id,
			expiresIn: expiresIn,
		});

		return token;
	}
}
