import express from "express";
import { appRouter } from "./router";

const app = express();
app.use(express.json());

app.use("/api", appRouter);

export { app };
