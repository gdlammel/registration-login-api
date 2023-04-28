import { User, UserDomainError } from "@/domain/entities";

export interface userTable {
	id: string;
	name: string;
	password: string;
	email: string;
	phone_number: bigint;
	totp_secret: string;
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
			totpSecret: user.totp_secret,
			phoneNumber: Number(user.phone_number),
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
			phone_number: BigInt(user.phoneNumber),
			totp_secret: user.totpSecret,
			created_at: new Date(),
			updated_at: new Date(),
		};

		return userInDb;
	}
}
