import express from "express";
import cors from "cors";

import { appRouter } from "./router";

const app = express();

app.use(express.json());

app.use(
	cors({
		credentials: true,
		allowedHeaders: ["Authorization"],
		origin: "*",
	})
);

app.use("/api", appRouter);

export { app };
