import Sequelize from "sequelize";
import dotenv from "dotenv";
import mysql2 from "mysql2";
dotenv.config();
const username = process.env.DB_USERNAME;
const database = process.env.DB_DATABASENAME;
const password = process.env.DB_PASSWORD;
const host = process.env.DB_HOST;

const sequelize = new Sequelize(database, username, password, {
  host: host,
  dialect: 'mysql',
  dialectModule:mysql2
});

export default sequelize;