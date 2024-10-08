import { Sequelize } from "sequelize";
import dotenv from 'dotenv';

dotenv.config();

const dbname = process.env.DB_NAME || 'db_articles';
const dbuser = process.env.DB_USER || 'root';
const dbpassword = process.env.DB_PASSWORD || '';
const dbhost = process.env.DB_HOST || 'localhost';



console.log('password', dbpassword);
console.log('host', dbhost);
console.log('user', dbuser);
console.log('name', dbname);
console.log('socket', process.env.INSTANCE_UNIX_SOCKET);

const db = new Sequelize(dbname, dbuser, dbpassword, {
  host: dbhost,
  dialect: 'mysql',
  dialectOptions: {
    socketPath: process.env.INSTANCE_UNIX_SOCKET
  },
  define: {
    timestamps: false,
    freezeTableName: true
  }
});

export default db;