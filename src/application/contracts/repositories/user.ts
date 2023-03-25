import { User } from "@/domain/entities";

export interface IUserRepository {
	save(user: User): Promise<User>;
	findUserByEmail(email: string): Promise<User | null>;
	findUserByID(id: string): Promise<User | null>;
	updatePassword(user: User, newPassword: string): Promise<boolean>;
}
