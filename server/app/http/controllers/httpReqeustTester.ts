import {Controller} from '@ahrakio/witty-core';

export class httpRequestTester extends Controller {
	constructor() {
		super();
	}

	httpMethod() {
		this.response.text(this.request.Method, 200);
	}

	httpBody() {
        this.response.text(this.request.Body, 200);
	}

}