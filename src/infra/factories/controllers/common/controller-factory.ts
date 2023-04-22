import {Controller} from "@/adapters/controllers/common";

export interface ControllerFactory{
	create(): Controller<any, any>
}