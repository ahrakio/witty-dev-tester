const {exec, execFile, execSync} = require('child_process');
const path = require('path');
const {existsSync} = require ('fs');
const conf = {
    core_path: 'E:\\NodeJS\\witty\\witty-core',
};
const start_path = __dirname;

const server_dir = path.join(start_path, 'server');
const client_dir = path.join(start_path, 'client');

// (1) link npm to local core
if (conf.core_path !== '') {
    let pack = execSync('npm pack', {cwd: conf.core_path});
    if (pack) {
        let pack_name = pack.toString().match(/ahrakio-witty-core-\d+\.\d+\.\d+\.tgz/i);
        if (pack_name && existsSync(path.join(conf.core_path, pack_name[0]))) {
            let local_install = execSync('npm install ' + path.join(conf.core_path, pack_name[0]), {cwd: server_dir});
            if (!local_install) {
                console.log('failed to install local witty-core')
            }
        }
    }
}
// (2) build server
let call = (error, stdout, stderr) => {
    if (error) {
        console.error(`exec error: ${error}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
};
let exec_client = () => {
    console.log('run tester client.');
    console.log('E:\\NodeJS\\witty\\witty-dev-tester\\client\\dist\\index.js')
    let client_rv = exec(`node ${path.join(client_dir, 'dist', 'index.js')}`, {}, (error, stdout, stderr)=>{
        server_ps.kill();
        call(error, stdout, stderr);
        process.exit(0);

    });
}



let server_build_rv = execSync('witty build', {cwd:server_dir});
if (!server_build_rv) {
    console.log('failed to build server!');
    return;
} else {
    console.log(server_build_rv.toString());
}

// (3) build client
let client_build_rv = execSync('tsc', {cwd: client_dir});
if (!client_build_rv) {
    console.log('failed to build client!');
    return;
} else {
    console.log('build client.');
}

// (4) exc server
console.log('serve witty server.');
let server_ps = exec('witty s ', {cwd: server_dir}, call);

// (5) exc client
setTimeout(exec_client, 5000);


