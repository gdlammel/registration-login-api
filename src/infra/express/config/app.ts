import express from "express";
import cors from 'cors'

import { appRouter } from "@/infra/express/config"

const app = express();
app.use(express.json());

app.use(cors({
	credentials: true,
	allowedHeaders: ["Authorization"],
	origin: "*"
}))

app.use("/api", appRouter);

export { app };
