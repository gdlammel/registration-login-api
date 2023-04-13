import { IResetPasswordGateway } from "@/application/reset-password";
import { User } from "@/domain/entities";
import { IUserRepository } from "@/adapters/repositories";
import { IHashService } from "@/adapters/services";

export class ResetPasswordGateway implements IResetPasswordGateway {
	constructor(
		private userRepository: IUserRepository,
		private hashService: IHashService
	) {}
	findUserByID(id: string): Promise<User | null> {
		return this.userRepository.findUserByID(id);
	}
	updatePassword(user: User, newPassword: string): Promise<boolean> {
		return this.userRepository.updatePassword(user, newPassword);
	}
	hash(password: string): Promise<string> {
		return this.hashService.hash(password);
	}
}
