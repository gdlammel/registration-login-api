import { User } from "@/domain/entities";

export interface ICreateUserGateway {
	findUserByEmail(email: string): Promise<User | null>;
	save(user: User): Promise<boolean>;
	hash(password: string): Promise<string>;
	generateId(): string;
	generateTotpSeed(name: string, secret: string): string;
}
