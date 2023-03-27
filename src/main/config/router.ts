import { Router } from "express";
import { userRoutes } from "@/main/routes";

const appRouter = Router();

appRouter.use("/users", userRoutes);

export { appRouter };
