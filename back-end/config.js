module.exports = {
  DB_URI: process.env.MONGO_URI ? process.env.MONGO_URI : 'mongodb://localhost:27017/todos',
  APP_PORT: process.env.APP_PORT ? process.env.APP_PORT : 3002,
};
