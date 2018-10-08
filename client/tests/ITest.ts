export interface ITest {
    testName:string;
    url:string; // include query params
    method?:string;
    headers?:string[];
    data:string;
    responseChecker: (res:string)=>boolean; // return true if the test success, false if failed.
}