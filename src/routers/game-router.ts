import { Router } from "express";
import { gamesService } from "../business/games-business-layer";

export const GamesRouter = Router({});

GamesRouter.get('/', async (req, res) => {
    const games = await gamesService.GetAllGames();
    res.render('games-list', { games });
});
