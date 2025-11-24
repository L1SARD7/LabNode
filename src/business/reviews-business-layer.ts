import { reviewsRepository } from '../repositories/reviews-db-repository';

export const reviewService = {
    async getGameReviews(gameId: number) {
        return await reviewsRepository.getReviewsByGameId(gameId);
    },

    async addReview(gameId: number, author: string, rating: number, comment: string) {
        await reviewsRepository.addReview(gameId, author, rating, comment);
    }
};
