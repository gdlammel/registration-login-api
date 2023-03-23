import { IUserRepository } from "@/application/contracts/repositories";
import { User } from "@/domain/entities";

export class InMemoryUserRepository implements IUserRepository {
	private users: User[];
	private timeSaveCalled: number;

	constructor(users: User[]) {
		this.users = users;
		this.timeSaveCalled = 0;
	}
	async save(user: User): Promise<User> {
		this.timeSaveCalled++;
		return user;
	}
	async findUserByEmail(email: string): Promise<User | null> {
		const foundEmailUser = this.users.find((user) => user.email === email);
		if (!foundEmailUser) {
			return null;
		}
		return foundEmailUser;
	}

	getTimesSaveCalled(): number {
		return this.timeSaveCalled;
	}
}
