import { pool } from "../db/db";
import { GameViewModel } from "../models/GameViewModel";

export const gamesRepository = {
    async getAllGames(): Promise<GameViewModel[]> {
        const result = await pool.query('SELECT * FROM games ORDER BY id ASC');
        return result.rows.map(row => ({
            id: row.id,
            title: row.title,
            genre: row.genre,
            release_year: row.release_year,
            developer: row.developer,
            description: row.description,
            imageURL: row.image_url,
            trailerYoutubeId: row.trailer_youtube_id,
            bannerURL: row.banner_url,
            avgRating: row.avg_rating
        }));
    },

    async getGameByID(id: number): Promise<GameViewModel | null> {
        const result = await pool.query('SELECT * FROM games WHERE id = $1', [id]);
        if (result.rows.length === 0) return null;
        const row = result.rows[0];
        return {
            id: row.id,
            title: row.title,
            genre: row.genre,
            release_year: row.release_year,
            developer: row.developer,
            description: row.description,
            imageURL: row.image_url,
            trailerYoutubeId: row.trailer_youtube_id,
            bannerURL: row.banner_url,
            avgRating: row.avg_rating
        };
    },

    async createNewGame(game: any): Promise<GameViewModel> {
        const query = `
            INSERT INTO games (title, genre, release_year, developer, description, image_url, trailer_youtube_id, banner_url)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING *`;
        const values = [
            game.title, game.genre, game.release_year, game.developer, 
            game.description, game.imageURL, game.trailerYoutubeId, game.bannerURL
        ];
        const result = await pool.query(query, values);
        const row = result.rows[0];
        return {
            id: row.id,
            title: row.title,
            genre: row.genre,
            release_year: row.release_year,
            developer: row.developer,
            description: row.description,
            imageURL: row.image_url,
            trailerYoutubeId: row.trailer_youtube_id,
            bannerURL: row.banner_url,
            avgRating: row.avg_rating
        };
    },

    async deleteGame(id: number): Promise<boolean> {
        const result = await pool.query('DELETE FROM games WHERE id = $1', [id]);
        return (result.rowCount || 0) > 0;
    },

    async updateGame(id: number, data: any): Promise<boolean> {
        return true; 
    }
}
