import { Router } from "express";
import { sessionRoutes, userRoutes } from "@/main/routes";

const appRouter = Router();

appRouter.use("/users", userRoutes);
appRouter.use("/session", sessionRoutes);

export { appRouter };
