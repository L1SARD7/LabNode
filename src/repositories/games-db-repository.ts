import { GameViewModel } from "../models/GameViewModel";

const games: GameViewModel[] = [
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
    }
}
