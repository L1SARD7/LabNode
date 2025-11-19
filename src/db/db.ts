import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

export const pool = new Pool({
    user: process.env.POSTGRES_USER || 'admin',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.POSTGRES_DB || 'gamepedia',
    password: process.env.POSTGRES_PASSWORD || 'password123',
    port: 5432,
});

export const runDB = async () => {
    try {
        const client = await pool.connect();
        console.log('Connected to PostgreSQL');
        client.release();
    } catch (err) {
        console.error('Database connection error', err);
    }
};
