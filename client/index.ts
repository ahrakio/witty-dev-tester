import {httpCoreTests} from "./tests/httpCoreTests";
import  * as fetch from 'node-fetch';
import {ITest} from "./tests/ITest";

const server_info = {port:'8400', host:'localhost'};
let success_count = 0;
let failed_count = 0;

let apply_remote_test = (unitTest: ITest )=> {
    return new Promise<boolean>((resolve, reject) => {
        fetch.default(`http://${server_info.host}:${server_info.port}/${unitTest.url}`, {method:unitTest.method, body:unitTest.data})
            .then(res => res.text())
            .then(body =>{
                if (!unitTest.responseChecker(body)) {
                    ++failed_count;
                    console.log(`${unitTest.testName} failed.\nReceived from server: ${body}`);
                } else {
                    ++success_count;
                }
                resolve(true);
            }).catch( (err) =>{
                ++failed_count;
                console.log(`${unitTest.testName} failed.\nFinish with an error: ${err}`);
                resolve(false);
        });
    });
    };


let tests = new httpCoreTests().tests;
let results: Promise<boolean>[] =[];
for (let i=0; i< tests.length; ++i) {
    try {
        results.push(apply_remote_test(tests[i]));
    } catch (e) {
        ++failed_count;
        console.log(`${tests[i].testName} failed.\nFinish with an exception: ${e.toString() }`)
    }
}
Promise.all(results).then((res)=> {
    console.log(`\n\n\n\n\
finish to run ${results.length} tests.\n\
failed: ${failed_count}.\n\
success: ${success_count}`);
});

