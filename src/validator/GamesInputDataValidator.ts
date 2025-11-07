import { Request, Response, NextFunction } from "express";

export const gameDataInputValidatorMiddleware = (req: Request, res: Response, next: NextFunction) => {
    next();
};
