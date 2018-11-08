var sql = require('sql.js');
const fs = require('fs');
const createDb = require('./create');
const db = null;
fs.readFile('./data.sqlite', (err, data) => {
  if (err) {
    db = createDb();
  } else {
    db = new sql.Database(new Uint8Array(data));
  }
});
