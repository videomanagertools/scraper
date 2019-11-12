const mm = require('music-metadata');
const util = require('util');

mm.parseFile('./Uptown Funk.mp3', {
  native: true
})
  .then(metadata =>
    console.log(util.inspect(metadata, { showHidden: false, depth: null }))
  )
  .catch(err => {
    console.error(err.message);
  });
