import crypto from 'crypto';
import { NextFunction, Request, Response } from 'express';
import { AuthUser } from '../types/auth-user';

const AUTH_SECRET = process.env.AUTH_SECRET || 'default_secret_key';

function signPayload(payload: string) {
    return crypto.createHmac('sha256', AUTH_SECRET).update(payload).digest('hex');
}

function parseCookies(cookieHeader?: string) {
    const cookies: Record<string, string> = {};
    if (!cookieHeader) return cookies;

    cookieHeader.split(';').forEach((cookie) => {
        const [name, ...rest] = cookie.trim().split('=');
        if (!name) return;
        cookies[name] = decodeURIComponent(rest.join('='));
    });
    return cookies;
}

function encodeToken(user: AuthUser) {
    const payload = Buffer.from(JSON.stringify({ ...user, iat: Date.now() })).toString('base64');
    return `${payload}.${signPayload(payload)}`;
}

function decodeToken(token: string): AuthUser | null {
    const [payload, signature] = token.split('.');
    if (!payload || !signature) return null;
    if (signPayload(payload) !== signature) return null;

    try {
        const data = JSON.parse(Buffer.from(payload, 'base64').toString());
        if (typeof data.id === 'number' && typeof data.login === 'string') {
            return { id: data.id, login: data.login };
        }
    } catch (e) {
        console.error('Failed to decode auth token', e);
    }

    return null;
}

export function setAuthCookie(res: Response, user: AuthUser) {
    const token = encodeToken(user);
    res.cookie('authToken', token, {
        httpOnly: true,
        sameSite: 'lax'
    });
}

export function clearAuthCookie(res: Response) {
    res.clearCookie('authToken');
}

export function authSessionMiddleware(req: Request, res: Response, next: NextFunction) {
    const cookies = parseCookies(req.headers.cookie);
    const token = cookies['authToken'];
    const user = token ? decodeToken(token) : null;

    if (user) {
        req.user = user;
        res.locals.user = user;
    } else {
        res.locals.user = null;
    }

    next();
}

export function requireAuth(req: Request, res: Response, next: NextFunction) {
    if (req.user) return next();

    return res.redirect('/auth/login');
}
