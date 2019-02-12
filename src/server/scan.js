var fs = require('fs');
var path = require('path');

function readDir(path) {
  return new Promise((resolve, reject) => {
    fs.readdir(path, (err, files) => {
      if (err) {
        reject(err);
      } else {
        resolve(files);
      }
    });
  });
}

function checkFileorDir(path) {
  return new Promise((resolve, reject) => {
    fs.stat(path, (err, stats) => {
      if (err) {
        reject(err);
      } else {
        if (stats.isDirectory()) {
          resolve('dir', stats);
        }
        if (stats.isFile()) {
          resolve('file', stats);
        }
        setTimeout(function() {
          reject(new Error('Time Out!'));
        }, 3000);
      }
    });
  });
}

function scanMedia(targetPath, regex) {
  var filePath = path.resolve(targetPath);
  readDir(filePath).then(files => {
    files.forEach(file => {
      let childPath = path.join(filePath, file);
      checkFileorDir(childPath)
        .then(type => {
          if (type === 'dir') {
            scanMedia(childPath, regex);
          }
          if (type === 'file') {
            if (regex.test(file)) {
              console.log(file);
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    });
  });
}

export { scanMedia };
