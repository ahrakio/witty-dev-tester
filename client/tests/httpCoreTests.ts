import {ITestsList} from "./ITestList";
import {ITest} from "./ITest";

const MethodList = ['GET', 'POST', 'DELETE', 'PUT', 'CONNECT', 'OPTIONS', 'PATCH', 'TRACE'];

export class httpCoreTests implements ITestsList {
    tests: ITest[];
    constructor() {
        this.tests =[];
        for (let i = 0 ; MethodList.length > i ; ++i) {
            this.tests.push(new httpMethod(MethodList[i]));
        }
        this.tests.push(new httpHeadMethod());
        this.tests.push(new httpBody())
    }
}


class httpMethod implements ITest {
    method:string;
    url: string;
    testName: string;
    data: string ;
    responseChecker: (res: string) => boolean;

    constructor(method:string) {
        this.method = method;
        this.url = 'httpMethod';
        this.data = '';
        this.testName = `HTTP ${this.method} method`;
        this.responseChecker = (res:string) => {return res === this.method};
    }
}

class httpHeadMethod extends httpMethod implements ITest {
    constructor() {
        super('HEAD');
        this.responseChecker= (res:string)=> {return res === '';};
    }

}

class httpBody implements ITest {
    testName: string;
    url: string;
    method: string;
    data: string;
    responseChecker: (res: string) => boolean;

    constructor() {
        this.data = 'test body';
        this.testName = `HTTP body test`;
        this.responseChecker= (res)=>{return res === this.data;};
        this.method = 'POST';
        this.url = 'httpBody';
    }
}

class httpPromiseBody extends httpBody implements ITest {
    constructor() {
        super();
        this.testName = 'HTTP Promised body test';
        this.url = 'httpPromiseBody';
    }
}
