import { Pool } from 'pg';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

export const pool = new Pool({
    user: process.env.DB_USER || 'admin',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'gamepedia',
    password: process.env.DB_PASSWORD || '1234',
    port: Number(process.env.DB_PORT) || 5433,
});

export const runDB = async () => {
    try {
        const client = await pool.connect();
        console.log(`Connected to PostgreSQL on port ${process.env.DB_PORT || 5433}`);
        client.release();
    } catch (err) {
        console.error('Database connection error:', err);
    }
};
