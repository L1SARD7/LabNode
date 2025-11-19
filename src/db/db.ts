import { Pool } from 'pg';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

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
        
        const sql = fs.readFileSync(path.join(__dirname, 'init.sql')).toString();
        await client.query(sql);
        console.log('Database initialized');
        
        client.release();
    } catch (err) {
        console.error('Database connection error', err);
    }
};
