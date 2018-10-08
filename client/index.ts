import {httpCoreTests} from "./tests/httpCoreTests";
import  * as fetch from 'node-fetch';
import {ITest} from "./tests/ITest";

const  server_info = {port:'8400', host:'localhost'};

let apply_remote_test = (unitTest: ITest )=> {
    fetch.default(`http://${server_info.host}:${server_info.port}/${unitTest.url}`, {method:unitTest.method, body:unitTest.data})
        .then(res => res.text())
        .then(body =>{
            if (!unitTest.responseChecker(body)) {
                console.log(`${unitTest.testName} failed.\nReceived from server: ${body}`);
            }
        }).catch( (err) =>{
            console.log(`${unitTest.testName} failed.\nFinish with an error: ${err}`);
        });
    };


let tests = new httpCoreTests().tests;
for (let i=0; i< tests.length; ++i) {
    try {
        apply_remote_test(tests[i]);
    } catch (e) {
        console.log(`${tests[i].testName} failed.\nFinish with an exception: ${e.toString() }`)
    }
}

