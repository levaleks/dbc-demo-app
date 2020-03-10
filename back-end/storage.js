const mongoose = require('mongoose');
const { model, Schema } = require('mongoose');
const { DB_URI } = require('./config');

class Storage {
  /**
   * @param {Object} document
   */
  constructor(document) {
    this.document = document;
  }

  /**
   * @param {string} name
   */
  create(name) {
    const newTodo = { name, done: false };
    // eslint-disable-next-line new-cap
    const todo = new this.document(newTodo);

    return todo.save();
  }

  findAll() {
    return this.document.find();
  }

  /**
   * @param {number} id
   */
  findById(id) {
    return this.document.findById(id);
  }

  /**
   * @param {number} id
   */
  deleteById(id) {
    return this.document.findByIdAndDelete(id);
  }

  /**
   *
   * @param {number} id
   * @param {*} object
   */
  updateById(id, { name, done }) {
    const query = { _id: id };

    return this.document.findOneAndUpdate(query, { $set: { name, done } });
  }
}

const document = model(
  'Todo',
  new Schema({
    name: {
      type: String,
    },
    done: {
      type: Boolean,
    },
  }),
);

mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

module.exports = new Storage(document);
