import {httpCoreTests} from "./tests/httpCoreTests";
import  * as fetch from 'node-fetch';
import {ITest} from "./tests/ITest";

const  server_info = {port:'8400', host:'localhost'};

let _fetch = (uniTest: ITest )=> {
    fetch.default(`http://${server_info.host}:${server_info.port}/${uniTest.url}`, {method:uniTest.method, body:uniTest.data})
        .then(res => res.text())
        .then(body =>{
            if (!uniTest.responseChecker(body)) {
                console.log(`${uniTest.testName} failed.\nReceived from server: ${body}`);
            }
        }).catch( (err) =>{
            console.log(`${uniTest.testName} failed.\nFinish with an error: ${err}`);
        });
    };


let tests = new httpCoreTests().tests;
for (let i=0; i< tests.length; ++i) {
    try {
        _fetch(tests[i]);
    } catch (e) {
        console.log(`${tests[i].testName} failed.\nFinish with an exception: ${e.toString() }`)
    }
}

