import { User } from "@/domain/entities";

export interface IVerifyTotpGateway {
	findUserByID(id: string): Promise<User | null>;
	verifyOtp(token: string, secret: string): boolean;
	generateToken(data: object, secret?: string, expiresIn?: string): string;
}
