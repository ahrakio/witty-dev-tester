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
