const db = require("../dbConfig");

module.exports = {
  get: function() {
    return db("accounts");
  },
  getAccountById: function(id) {
    return db("accounts")
      .where({ id })
      .first();
  },
  insert: function({ name, budget }) {
    return db("accounts")
      .insert({ name, budget })
      .then(([id]) => this.getAccountById(id));
  },
  update: function(id, { name, budget }) {
    return db("accounts")
      .where({ id })
      .update({name, budget})
      .then(count => (count > 0 ? this.getAccountById(id) : null));
  }
};