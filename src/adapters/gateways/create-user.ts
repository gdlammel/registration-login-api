import { IUserRepository } from "@/adapters/repositories";
import { IHashService, IIdService } from "@/adapters/services";
import { User } from "@/domain/entities";
import { ICreateUserGateway } from "@/application/create-user";

export class CreateUserGateway implements ICreateUserGateway {
	constructor(
		private userRepository: IUserRepository,
		private idService: IIdService,
		private hashService: IHashService
	) {}
	async findUserByEmail(email: string): Promise<User | null> {
		return this.userRepository.findUserByEmail(email);
	}
	async save(user: User): Promise<boolean> {
		return this.userRepository.save(user);
	}
	async hash(password: string): Promise<string> {
		return this.hashService.hash(password);
	}
	generateId(): string {
		return this.idService.generateId();
	}
}
