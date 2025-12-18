import { Router, Request, Response } from 'express';
import { gameService } from '../business/games-business-layer';
import { reviewService } from '../business/reviews-business-layer';
import { inputValidator } from '../validator/input-validator';
import { requireAuth } from '../middleware/auth-session';

export const gameRouter = Router();

gameRouter.get('/', async (req, res) => {
    try {
        const games = await gameService.getAllGames();
        res.render('games-list', { games });
    } catch (e) {
        console.error("GET /games Error:", e);
        res.status(500).send('DB Error');
    }
});

gameRouter.get('/new', requireAuth, (req, res) => res.render('create-game'));

gameRouter.post('/', requireAuth, async (req, res) => {
    try {
        const { title, developer, year, genre, description } = req.body;
        await gameService.createGame(title, developer, Number(year), genre, description);
        res.redirect('/games');
    } catch (e) {
        console.error("POST /games Error:", e);
        res.status(500).send('Creation Error');
    }
});

gameRouter.post('/:id/delete', requireAuth, async (req, res) => {
    try {
        await gameService.deleteGame(Number(req.params.id));
        res.redirect('/games');
    } catch (e) {
        console.error("DELETE Error:", e);
        res.status(500).send('Delete Error');
    }
});

gameRouter.get('/:id', async (req, res) => {
    try {
        const id = Number(req.params.id);
        const game = await gameService.getGameById(id);
        if (!game) return res.status(404).send('Not found');
        
        const reviews = await reviewService.getGameReviews(id);
        
        res.render('game-page', { game, reviews });
    } catch (e) {
        console.error("GET /games/:id Error:", e);
        res.status(500).send('Error');
    }
});

gameRouter.post('/:id/reviews', requireAuth, async (req, res) => {
    try {
        const error = inputValidator.validateReview(req.body);
        if (error) return res.status(400).send(error);

        const id = Number(req.params.id);
        const { rating, comment } = req.body;
        const author = req.user?.login || 'Anonymous';
        await reviewService.addReview(id, author, Number(rating), comment);
        res.redirect('/games/' + id);
    } catch (e) {
        console.error("POST Review Error:", e);
        res.status(500).send('Review Error');
    }
});
