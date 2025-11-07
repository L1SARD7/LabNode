import { GameViewModel } from "../models/GameViewModel";

let games: GameViewModel[] = [
    {
        id: 1,
        title: "The Witcher 3",
        genre: "RPG",
        release_year: 2015,
        developer: "CD Projekt Red",
        description: "Geralt of Rivia searches for his adopted daughter.",
        imageURL: "",
        trailerYoutubeId: "",
        bannerURL: "",
        avgRating: "9.8"
    },
    {
        id: 2,
        title: "Cyberpunk 2077",
        genre: "RPG",
        release_year: 2020,
        developer: "CD Projekt Red",
        description: "A mercenary outlaw chasing a unique implant.",
        imageURL: "",
        trailerYoutubeId: "",
        bannerURL: "",
        avgRating: "8.5"
    }
];

export const GamesRepository = {
    async GetAllGames(): Promise<GameViewModel[]> {
        return games;
    },

    async GetGameByID(id: number): Promise<GameViewModel | null> {
        return games.find(g => g.id === id) || null;
    },

    async CreateNewGame(game: any): Promise<GameViewModel> {
        const newId = games.length > 0 ? Math.max(...games.map(g => g.id)) + 1 : 1;
        const newGame = { ...game, id: newId };
        games.push(newGame);
        return newGame;
    },

    async DeleteGame(id: number): Promise<boolean> {
        const initialLength = games.length;
        games = games.filter(g => g.id !== id);
        return games.length !== initialLength;
    },

    async UpdateGame(id: number, data: any): Promise<boolean> {
        const index = games.findIndex(g => g.id === id);
        if (index > -1) {
            games[index] = { ...games[index], ...data };
            return true;
        }
        return false;
    }
}
