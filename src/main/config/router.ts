import { Router } from "express";
import { userRoutes } from "@/main/routes";

const appRouter = Router();

appRouter.use("/user", userRoutes);

export { appRouter };
