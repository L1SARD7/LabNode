import { pool } from '../db/db';
import { ReviewViewModel } from '../models/ReviewViewModel';

export const reviewsRepository = {
    async getReviewsByGameId(gameId: number): Promise<ReviewViewModel[]> {
        const query = 'SELECT * FROM reviews WHERE game_id = $1 ORDER BY created_at DESC';
        const result = await pool.query(query, [gameId]);
        // Тут повертаємо rows як є, бо назви колонок в БД збігаються з інтерфейсом (snake_case)
        return result.rows as ReviewViewModel[]; 
    },

    async addReview(gameId: number, author: string, rating: number, comment: string): Promise<number> {
        const client = await pool.connect();

        try {
            await client.query('BEGIN');

            const insertQuery = 'INSERT INTO reviews (game_id, author_name, rating, comment) VALUES ($1, $2, $3, $4)';
            await client.query(insertQuery, [gameId, author, rating, comment]);

            const avgUpdateQuery = `
                UPDATE games
                SET avg_rating = (SELECT AVG(rating) FROM reviews WHERE game_id = $1)
                WHERE id = $1
                RETURNING avg_rating
            `;

            const avgUpdateResult = await client.query(avgUpdateQuery, [gameId]);

            await client.query('COMMIT');

            return Number(avgUpdateResult.rows[0].avg_rating);
        } catch (error) {
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.release();
        }
    }
};
