import { User, UserDomainError } from "@/domain/entities";

export interface userTable {
	id: string;
	name: string;
	password: string;
	email: string;
	phone_number: number;
	created_at: Date;
	updated_at: Date;
}

export class UserMapper {
	public static toDomain(user: userTable): User | UserDomainError {
		const domainUser = User.create({
			id: user.id,
			name: user.name,
			password: user.password,
			email: user.email,
			phoneNumber: user.phone_number,
		});

		if (domainUser instanceof User) {
			return domainUser;
		}
		return new UserDomainError();
	}
	public static toPersistence(user: User): userTable {
		const userInDb: userTable = {
			id: user.id,
			name: user.name,
			password: user.password,
			email: user.email,
			phone_number: user.phoneNumber,
			created_at: new Date(),
			updated_at: new Date(),
		};

		return userInDb;
	}
}
