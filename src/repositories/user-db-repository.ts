import { pool } from '../db/db';
import { UserViewModel } from '../models/UserViewModel';

export const userRepository = {
    async createUser(login: string, email: string, passwordHash: string): Promise<UserViewModel> {
        const query = 'INSERT INTO users (login, email, password) VALUES ($1, $2, $3) RETURNING id, login, email';
        const result = await pool.query(query, [login, email, passwordHash]);
        return result.rows[0];
    },

    async findUserByLogin(login: string): Promise<any | null> {
        const query = 'SELECT * FROM users WHERE login = $1';
        const result = await pool.query(query, [login]);
        return result.rows[0] || null;
    },
};
