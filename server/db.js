const mongoose = require('mongoose');

const connect = () => {
  mongoose.connect('mongodb://localhost:27017/pidgeon')
  .then(()=>{console.log('Connected to MongoDB')})
  .catch(err => {console.log('Error connecting to MongoDB:', err.message)});
}

connect();

const pidgeonSchema = new mongoose.Schema({
  name: String,
  url: {type: String, unique: true, dropDups: true},
  isPidgeon: Boolean,
  percent: mongoose.Types.Decimal128,
  liked: Boolean
});

const Pidgeon = mongoose.model('Pidgeon', pidgeonSchema);

module.exports = {
  connect,
  save: (pidgeon) => {
    return new Pidgeon({
      name: pidgeon.name,
      url: pidgeon.url,
      isPidgeon: pidgeon.isPidgeon,
      percent: pidgeon.pidgeonPercent,
      liked: false
    })
      .save()
  },
  getAll: () => {
    return Pidgeon.find()
  },
  update: (query) => {
    // query format = { _id: '6240c82878ce09b23c498d7f', name: 'Shawn' }
    // get it with query.id and
    // updateOne({_id: query:_id}, {$set: (name or isPidgeon)})
    return Pidgeon.updateOne({_id: query._id}, {$set: {[Object.keys(query)[1]]: query[Object.keys(query)[1]]}});
  },
  delete: (query) => {
    return Pidgeon.deleteOne(query);
  }
}