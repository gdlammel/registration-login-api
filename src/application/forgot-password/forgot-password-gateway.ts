import { User } from "@/domain/entities";

export interface IForgotPasswordGateway {
	findUserByEmail(email: string): Promise<User | null>;
	generateToken(data: object, secret?: string, expiresIn?: string): string;
	sendEmail(user: User, token: string): Promise<boolean>;
}
