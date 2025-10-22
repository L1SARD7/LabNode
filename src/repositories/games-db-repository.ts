import { GameViewModel } from "../models/GameViewModel";
// import { pool } from "../db/db";

export const GamesRepository = {
    async GetAllGames(): Promise<GameViewModel[]> {
        // SQL query placeholder
        return [];
    },

    async GetGameByID(id: number): Promise<GameViewModel | null> {
        return null;
    },

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
