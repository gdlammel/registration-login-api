import { IUserRepository } from "@/application/contracts/repositories";
import { User } from "@/domain/entities";
import { UserMapper } from "@/infra/data-mappers";
import prisma from "@/infra/prisma/prisma-client";

export class DBUserRepository implements IUserRepository {
	async findUserByEmail(email: string): Promise<User | null> {
		try {
			const foundUser = await prisma.user.findUnique({
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
			const foundUser = await prisma.user.findUnique({
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
			await prisma.user.create({
				data: userToPersistence,
			});
			return true;
		} catch (error) {
			throw new Error();
		}
	}
	async updatePassword(user: User, newPassword: string): Promise<boolean> {
		try {
			await prisma.user.update({
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
