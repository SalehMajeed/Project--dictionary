const mongoose = require('mongoose');
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
    add_word: {
      type: Object,
      definition: String,
      exapmle: String,
    },
  },
  { timestamps: true }
);
const user_model = mongoose.model('user', user_schema);

async function store_data(req, res) {
  const result = await user_model.create({
    username: 'user1',
    email: 'user@user.com',
    password: '123',
    gone: {
      definition: req.body.definition,
      example: req.body.example,
    },
  });
  console.log(result);
}

module.exports = { store_data };
