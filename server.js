const fs = require('fs');

const data = fs.readFileSync('./server.js', 'utf-8');

console.log(data);
