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

	httpPromiseBody() {
		this.request.PromisedBody().then((body)=>this.response.text(body)).catch((err)=>this.response.text(err));
	}

    httpStreamBody() {
		let buffer ='';
		this.request.StreamedBody((buf)=>{buffer+=buf},
									()=>this.response.text(buffer),
								(err)=>this.response.text('ERROR: ' + err));
	}
}