import { GamesRepository } from "../repositories/games-db-repository";

export const gamesService = {
    async GetAllGames() {
        return await GamesRepository.GetAllGames();
    }
}
