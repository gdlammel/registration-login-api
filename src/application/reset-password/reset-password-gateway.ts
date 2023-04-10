import {User} from "@/domain/entities";

export interface IResetPasswordGateway{
	findUserByID(id: string): Promise<User | null>;
	updatePassword(user: User, newPassword: string): Promise<boolean>;
	hash(password: string): Promise<string>
}
