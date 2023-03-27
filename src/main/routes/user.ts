import { Router } from "express";
import { CreateUserControllerFactory } from "@/main/factories";

const userRoutes = Router();

const createUserController = CreateUserControllerFactory.create();
userRoutes.post("/", createUserController.handle.bind(createUserController));

export { userRoutes };
