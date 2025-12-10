import { pool } from '../db/db';
import { GameViewModel } from '../models/GameViewModel';

export const gamesRepository = {
    async getAllGames(): Promise<GameViewModel[]> {
        const query = `
            SELECT id, title, genre, release_year, developer, description, image_url, avg_rating 
            FROM games ORDER BY id DESC
        `;
        const result = await pool.query(query);

        return result.rows.map((row) => ({
            id: row.id,
            title: row.title,
            genre: row.genre,
            releaseYear: row.release_year, // Мапимо release_year -> releaseYear
            developer: row.developer,
            description: row.description,
            imageUrl: row.image_url, // Мапимо image_url -> imageUrl
            rating: Number(row.avg_rating),
        }));
    },

    async getGameById(id: number): Promise<GameViewModel | null> {
        const query = 'SELECT * FROM games WHERE id = $1';
        const result = await pool.query(query, [id]);

        if (result.rows.length === 0) return null;

        const row = result.rows[0];
        return {
            id: row.id,
            title: row.title,
            genre: row.genre,
            releaseYear: row.release_year,
            developer: row.developer,
            description: row.description,
            imageUrl: row.image_url,
            rating: Number(row.avg_rating),
        };
    },

    async createGame(data: {
        title: string;
        developer: string;
        year: number;
        genre: string;
        description: string;
    }): Promise<void> {
        const query = `
            INSERT INTO games (title, developer, release_year, genre, description, avg_rating, image_url)
            VALUES ($1, $2, $3, $4, $5, 0, 'https://placehold.co/600x400?text=No+Image')
        `;
        await pool.query(query, [data.title, data.developer, data.year, data.genre, data.description]);
    },

    async deleteGame(id: number): Promise<void> {
        const query = 'DELETE FROM games WHERE id = $1';
        await pool.query(query, [id]);
    },
};
