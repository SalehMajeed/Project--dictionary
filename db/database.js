const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

const user_schema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    add_word: Object,
  },
  { timestamps: true }
);
const user_model = mongoose.model('user', user_schema);

async function store_data(req, res) {
  const word = req.body.word;
  console.log(word);
  // const deleted = await user_model
  //   .findOneAndRemove({ username: 'user1' })
  //   .catch((err) => {
  //     console.log(err);
  //   });
  // console.log(deleted);

  const result = await user_model
    .updateOne(
      { username: 'user1' },
      {
        $set: {
          add_word: {
            [word]: {
              definition: req.body.definition,
              example: req.body.example,
            },
          },
        },
      },
      { upsert: true }
    )
    .catch((err) => {
      console.log(err);
    });
  console.log(result);
}

module.exports = { store_data };
