import mongoose from "mongoose";


/*
const dbConfig = {
  user: process.env.DB_USER || 'user',
  password: process.env.DB_PASS || 'password',
  server: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'mssqlDb'
};

const db = mysql.createConnection({
    host     : process.env.DB_WRITE_HOST || 'localhost',
    user     : process.env.DB_USERNAME   || 'root',
    password : process.env.DB_PASSWORD   || 'Li19830403',
    database : process.env.DB_DATABASE   || 'hawksbill',
    port     : process.env.DB_PORT       || 3306
});
*/
//Set up mongoose connection



export default async callback => {
  // connect to a database if needed, then pass it to `callback`:
  try {
    var mongoDB = 'mongodb://localhost/hawksbill';
    mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true});
    mongoose.Promise = global.Promise;
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    callback(db)
  } catch (err) {
    // ... error checks
    console.log(err);
  }
}
