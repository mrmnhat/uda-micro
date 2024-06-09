import {Sequelize} from 'sequelize-typescript';
import {config} from './config/config';


export const sequelize = new Sequelize({
  'username': config.username || "postgres",
  'password': config.password|| "postgres",
  'database': config.database|| "postgres",
  'host': config.host|| "postgres1.ce8pfkihmjtf.us-east-1.rds.amazonaws.com",

  'dialect': config.dialect,
  'storage': ':memory:',
  'dialectOptions': {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
});
