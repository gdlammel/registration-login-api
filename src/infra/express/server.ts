import { env } from "@/infra/env";
import { ExpressApp } from "@/infra/express/config";

const expressApp = new ExpressApp();

expressApp.app.listen(env.port, () => {
	console.log("Server is running");
});
