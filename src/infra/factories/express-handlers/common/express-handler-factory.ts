import { ExpressHandler } from "@/infra/express/handlers/common";

export interface ExpressHandlerFactory {
	create(): ExpressHandler;
}
