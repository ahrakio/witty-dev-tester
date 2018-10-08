import { httpRequestTester } from "./app/http/controllers/httpReqeustTester";
import {WittyApp, AppAbstract} from '@ahrakio/witty-core';

@WittyApp ({
	controllers: [
		httpRequestTester
	],
	middlewares: []
})
export class App extends AppAbstract {
	constructor() {
		super();
	}

}