const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017';

mongoose.Promise = global.Promise;

const connect = (url) =>
  mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

connect(url)
    .then(async (connection) => {
      console.log(connection)
  })
  .catch((e) => console.error(e));
