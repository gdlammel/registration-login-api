import { User } from "@/domain/entities";

export interface IAuthenticateUserGateway {
	findUserByEmail(email: string): Promise<User | null>;
	compare(inputPassword: string, userPassword: string): Promise<boolean>;
	generateToken(data: object, secret?: string, expiresIn?: string): string;
}
