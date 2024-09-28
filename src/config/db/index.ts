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

const db = new Sequelize(dbname, dbuser, dbpassword, {
  host: dbhost,
  dialect: 'mysql',
  define: {
    timestamps: false,
    freezeTableName: true
  }
});

export default db;