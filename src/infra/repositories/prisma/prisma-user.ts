import { IUserRepository } from "@/adapters/repositories";
import { User } from "@/domain/entities";
import { UserMapper } from "@/infra/data-mappers";
import { Client } from "@/infra/prisma";

export class PrismaUserRepository implements IUserRepository {
	async findUserByEmail(email: string): Promise<User | null> {
		try {
			const foundUser = await Client.user.findUnique({
				where: {
					email,
				},
			});
			if (!foundUser) {
				return null;
			}
			const domainUser = UserMapper.toDomain(foundUser);
			return domainUser as User;
		} catch (error) {
			throw new Error();
		}
	}

	async findUserByID(id: string): Promise<User | null> {
		try {
			const foundUser = await Client.user.findUnique({
				where: {
					id,
				},
			});
			if (!foundUser) {
				return null;
			}
			const domainUser = UserMapper.toDomain(foundUser);
			return domainUser as User;
		} catch (error) {
			throw new Error();
		}
	}

	async save(user: User): Promise<boolean> {
		const userToPersistence = UserMapper.toPersistence(user);
		try {
			await Client.user.create({
				data: userToPersistence,
			});
			return true;
		} catch (error) {
			throw new Error();
		}
	}
	async updatePassword(user: User, newPassword: string): Promise<boolean> {
		try {
			await Client.user.update({
				where: {
					id: user.id,
				},
				data: {
					password: newPassword,
				},
			});

			return true;
		} catch (error) {
			throw new Error();
		}
	}
}
