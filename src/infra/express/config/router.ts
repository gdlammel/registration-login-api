import { Router } from "express";

import { sessionRoutes, userRoutes } from "@/infra/express/routes";

const appRouter = Router();

appRouter.use("/users", userRoutes);
appRouter.use("/session", sessionRoutes);

export { appRouter };
