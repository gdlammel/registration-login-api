import { User } from "@/domain/entities";

export interface IUserRepository {
	save(user: User): Promise<User>;
	findUserByEmail(email: string): Promise<User | null>;
}
