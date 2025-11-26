const fs = require('fs');

// size fo chunk can be edited by 'highWaterMark'
const rs = fs.createReadStream('./lorem.txt', { highWaterMark: 8, encoding: 'utf-8' });
const ws = fs.createWriteStream('./new-lorem.txt');

// rs.on('data', (chunk) => {
// 	ws.write(chunk);
// });

rs.pipe(ws);
