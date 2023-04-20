import { env } from "@/infra/env"
import { app } from "@/infra/express/config";

app.listen(env.port, () => {
	console.log("Server is running");
});
