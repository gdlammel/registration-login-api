import { Router } from "express";
import { createUserController } from "@/main/factories";
const userRoutes = Router();

userRoutes.post("/", createUserController.handle);

export { userRoutes };
