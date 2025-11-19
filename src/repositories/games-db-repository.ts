import { pool } from "../db/db";
import { GameViewModel } from "../models/GameViewModel";

export const GamesRepository = {
    async GetAllGames(): Promise<GameViewModel[]> {
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

    async GetGameByID(id: number): Promise<GameViewModel | null> {
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

    // Заглушки для запису (щоб не ламати інтерфейс до наступного коміту)
    async CreateNewGame(game: any): Promise<GameViewModel> {
        return game;
    },
    async DeleteGame(id: number): Promise<boolean> {
        return true;
    },
    async UpdateGame(id: number, data: any): Promise<boolean> {
        return true;
    }
}
