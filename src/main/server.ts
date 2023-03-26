import { app, env } from "@/main/config";

app.listen(env.port, () => {
	console.log("Server is running");
});
