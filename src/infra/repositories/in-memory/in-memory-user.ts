import { IUserRepository } from "@/application/contracts/repositories";
import { User } from "@/domain/entities";

export class InMemoryUserRepository implements IUserRepository {
	private users: User[];
	private timeSaveCalled: number;

	constructor(users: User[]) {
		this.users = users;
		this.timeSaveCalled = 0;
	}
	async save(user: User): Promise<boolean> {
		this.timeSaveCalled++;
		return true;
	}
	async findUserByEmail(email: string): Promise<User | null> {
		const foundEmailUser = this.users.find((user) => user.email === email);
		if (!foundEmailUser) {
			return null;
		}
		return foundEmailUser;
	}
	async findUserByID(id: string): Promise<User | null> {
		const foundIdUser = this.users.find((user) => user.id === id);
		if (!foundIdUser) {
			return null;
		}
		return foundIdUser;
	}
	async updatePassword(user: User, newPassword: string): Promise<boolean> {
		const foundUser = this.users.find(
			(systemUser) => systemUser.id === user.id
		);
		const updatedUser = User.create({
			id: user.id,
			name: user.name,
			password: newPassword,
			email: user.email,
			phoneNumber: user.phoneNumber,
		});
		this.users = [updatedUser as User];
		return true;
	}
	getUpdatedUser(): User[] {
		return this.users;
	}
	getTimesSaveCalled(): number {
		return this.timeSaveCalled;
	}
}
