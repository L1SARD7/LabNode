import { Router } from "express";
import { gamesService } from "../business/games-business-layer";

export const GamesRouter = Router({});

GamesRouter.get('/', async (req, res) => {
    const games = await gamesService.GetAllGames();
    res.render('games-list', { games });
});

GamesRouter.get('/:id', async (req, res) => {
    const game = await gamesService.GetGameByID(+req.params.id);
    if (game) {
        res.render('game-page', { game });
    } else {
        res.status(404).send('Game not found');
    }
});
