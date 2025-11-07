import { GamesRepository } from "../repositories/games-db-repository";

export const gamesService = {
    async GetAllGames() {
        return await GamesRepository.GetAllGames();
    },

    async GetGameByID(id: number) {
        return await GamesRepository.GetGameByID(id);
    },

    async CreateNewGame(title: string, genre: string, release_year: number, developer: string, description: string, imageURL: string, trailerYoutubeId: string, bannerURL: string) {
        const newGame = {
            title, genre, release_year, developer, description, imageURL, trailerYoutubeId, bannerURL
        };
        return await GamesRepository.CreateNewGame(newGame);
    },

    async DeleteGame(id: number) {
        return await GamesRepository.DeleteGame(id);
    }
}
