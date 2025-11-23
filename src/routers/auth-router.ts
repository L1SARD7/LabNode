import { Router } from 'express';
import { userService } from '../business/user-business-layer';
import { inputValidator } from '../validator/input-validator';

export const authRouter = Router();

authRouter.get('/login', (req, res) => res.render('login'));
authRouter.get('/register', (req, res) => res.render('register'));

authRouter.post('/register', async (req, res) => {
    try {
        const errors = inputValidator.validateUserRegistration(req.body);
        if (errors) return res.status(400).send(errors.join(', '));

        await userService.registerUser(req.body.login, req.body.email, req.body.password);
        res.redirect('/auth/login');
    } catch (e) {
        console.error(e);
        res.status(500).send('Registration error');
    }
});

authRouter.post('/login', async (req, res) => {
    try {
        const user = await userService.checkCredentials(req.body.login, req.body.password);
        if (user) {
            res.redirect('/games');
        } else {
            res.status(401).send('Invalid credentials');
        }
    } catch (e) {
        res.status(500).send('Login error');
    }
});
