import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

// Sequelize manages its own connection pool internally.
const sequelize = new Sequelize(
  process.env.DB_NAME || 'ticketflow',
  process.env.DB_USER || 'postgres',
  process.env.DB_PASSWORD || 'postgres',
  {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    logging: false,
  }
);

export default sequelize;