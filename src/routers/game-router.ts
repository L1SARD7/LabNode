import { Router, Request, Response } from 'express';
import { gameService } from '../business/games-business-layer';
import { reviewService } from '../business/reviews-business-layer';
import { inputValidator } from '../validator/input-validator';

export const gameRouter = Router();

gameRouter.get('/', async (req, res) => {
    try {
        const games = await gameService.getAllGames();
        res.render('games-list', { games });
    } catch (e) {
        res.status(500).send('DB Error');
    }
});

gameRouter.get('/new', (req, res) => res.render('create-game'));

gameRouter.post('/', async (req, res) => {
    try {
        const { title, developer, year, genre, description } = req.body;
        await gameService.createGame(title, developer, Number(year), genre, description);
        res.redirect('/games');
    } catch (e) {
        res.status(500).send('Creation Error');
    }
});

gameRouter.post('/:id/delete', async (req, res) => {
    await gameService.deleteGame(Number(req.params.id));
    res.redirect('/games');
});

gameRouter.get('/:id', async (req, res) => {
    try {
        const id = Number(req.params.id);
        const game = await gameService.getGameById(id);
        if (!game) return res.status(404).send('Not found');
        
        const reviews = await reviewService.getGameReviews(id);
        
        res.render('game-page', { game, reviews });
    } catch (e) {
        res.status(500).send('Error');
    }
});

gameRouter.post('/:id/reviews', async (req, res) => {
    const error = inputValidator.validateReview(req.body);
    if (error) return res.status(400).send(error);

    const id = Number(req.params.id);
    const { author, rating, comment } = req.body;
    await reviewService.addReview(id, author, Number(rating), comment);
    res.redirect('/games/' + id);
});
