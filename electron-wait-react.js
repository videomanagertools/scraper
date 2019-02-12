const net = require('net');
const debugEle = require('debug')('Electron');
const debugReact = require('debug')('React');
const debugMain = require('debug')('Main');
debugEle.enabled = true;
debugReact.enabled = true;
debugMain.enabled = true;
const port = process.env.PORT ? process.env.PORT - 100 : 3000;
const exec = require('child_process').exec;
process.env.ELECTRON_START_URL = `http://localhost:${port}`;

const client = new net.Socket();
exec('npm start').stdout.on('data', function(data) {
  debugReact(data.toString());
});
let startedElectron = false;
const tryConnection = () =>
  client.connect(
    {
      port: port
    },
    () => {
      client.end();
      if (!startedElectron) {
        debugEle('starting electron');
        startedElectron = true;
        exec('npm run electron').stdout.on('data', function(data) {
          debugEle(data.toString());
        });
      }
    }
  );

tryConnection();
// process
//     .stdout
//     .on('data', data => {
//         debugMain(data.toString())
//     })
client.on('error', error => {
  console.log(error);
  setTimeout(tryConnection, 1000);
});
