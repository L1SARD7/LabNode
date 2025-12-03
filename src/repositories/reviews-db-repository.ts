import { pool } from '../db/db';
import { ReviewViewModel } from '../models/ReviewViewModel';

export const reviewsRepository = {
    async getReviewsByGameId(gameId: number): Promise<ReviewViewModel[]> {
        const query = 'SELECT * FROM reviews WHERE game_id = $1 ORDER BY created_at DESC';
        const result = await pool.query(query, [gameId]);
        // Тут повертаємо rows як є, бо назви колонок в БД збігаються з інтерфейсом (snake_case)
        return result.rows as ReviewViewModel[]; 
    },

    async addReview(gameId: number, author: string, rating: number, comment: string) {
        const query = 'INSERT INTO reviews (game_id, author_name, rating, comment) VALUES ($1, $2, $3, $4)';
        await pool.query(query, [gameId, author, rating, comment]);
    }
};
