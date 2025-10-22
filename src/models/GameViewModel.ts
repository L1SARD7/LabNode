export interface GameViewModel {
    id: number;
    title: string;
    genre: string;
    release_year: number;
    developer: string;
    description: string;
    imageURL: string;
    trailerYoutubeId: string;
    bannerURL: string;
    avgRating?: string;
}
