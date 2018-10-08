const {exec, execSync} = require('child_process');
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
    try {
        execSync('npm run-script build', {cwd: conf.core_path});
    } catch (error)  {
        console.log('failed to build local witty core');
        console.log(error.message);
        process.exit(-1);
    }
    try {
        execSync('npm pack', {cwd: conf.core_path});
        let pack_name = pack.toString().match(/ahrakio-witty-core-\d+\.\d+\.\d+\.tgz/i);
        if (pack_name && existsSync(path.join(conf.core_path, pack_name[0]))) {
            try {
                execSync('npm install ' + path.join(conf.core_path, pack_name[0]), {cwd: server_dir});
            } catch (error) {
                console.log('failed to install local witty-core');
                console.log(error.message);
                process.exit(-1);
            }
        }
    } catch (error) {
        console.log('failed to pack local witty core');
        console.log(error.message);
        process.exit(-1);
    }
}
// (2) build server
let call = (error, stdout, stderr) => {
    if (error) {
        console.error(`exec error: \n${error}`);
        return;
    }
    console.log(`stdout: \n\n${stdout}`);
    console.log(`stderr: \n${stderr}`);
};
let exec_client = () => {
    console.log('run tester client.');
    exec(`node ${path.join(client_dir, 'dist', 'index.js')}`, {}, (error, stdout, stderr)=>{
        server_ps.kill(9);
        call(error, stdout, stderr);
        process.exit(0);
    });
};


try {
    execSync('witty build', {cwd: server_dir});
    console.log('server built');
} catch (error) {
    console.log('failed to build server!');
    console.log(error.message);
    process.exit(-1);
}

// (3) build client
try {
    execSync('tsc', {cwd: client_dir});
    console.log('client built.');
} catch (error) {
    console.log('failed to build client!');
    console.log(error.message);
    process.exit(-1);
}

// (4) exc server
console.log('serve witty server.');
let server_ps = exec('witty s ', {cwd: server_dir}, call);

// (5) exc client
setTimeout(exec_client, 5000);


