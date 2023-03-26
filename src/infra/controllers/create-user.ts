import { Request, Response } from "express";
import { CreateUserUseCase } from "@/application/use-cases/create-user";
export class CreateUserController {
	constructor(private createUserUseCase: CreateUserUseCase) {}
	async handle(request: Request, response: Response) {}
}
