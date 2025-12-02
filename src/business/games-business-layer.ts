import { gamesRepository } from '../repositories/games-db-repository';
import { GameViewModel } from '../models/GameViewModel';

export const gameService = {
    async getAllGames(): Promise<GameViewModel[]> {
        return await gamesRepository.getAllGames();
    },

    async getGameById(id: number): Promise<GameViewModel | null> {
        return await gamesRepository.getGameById(id);
    },

    async createGame(title: string, developer: string, year: number, genre: string, description: string) {
        await gamesRepository.createGame({ title, developer, year, genre, description });
    },

    async deleteGame(id: number) {
        await gamesRepository.deleteGame(id);
    }
};
