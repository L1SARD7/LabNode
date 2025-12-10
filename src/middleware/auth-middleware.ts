import { NextFunction, Request, Response } from 'express';
import crypto from 'crypto';
import { UserViewModel } from '../models/UserViewModel';

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-key';
export const AUTH_COOKIE_NAME = 'token';

const base64UrlEncode = (input: string) => Buffer.from(input).toString('base64url');

const buildSignature = (data: string) => crypto.createHmac('sha256', JWT_SECRET).update(data).digest('base64url');

export const createAuthToken = (user: UserViewModel, ttlSeconds = 60 * 60 * 24 * 7) => {
    const header = { alg: 'HS256', typ: 'JWT' };
    const payload = { ...user, exp: Math.floor(Date.now() / 1000) + ttlSeconds };

    const encodedHeader = base64UrlEncode(JSON.stringify(header));
    const encodedPayload = base64UrlEncode(JSON.stringify(payload));
    const data = `${encodedHeader}.${encodedPayload}`;
    const signature = buildSignature(data);

    return `${data}.${signature}`;
};

export const verifyAuthToken = (token?: string): UserViewModel | null => {
    if (!token) return null;

    const [header, payload, signature] = token.split('.');
    if (!header || !payload || !signature) return null;

    const data = `${header}.${payload}`;
    const expectedSignature = buildSignature(data);
    if (expectedSignature.length !== signature.length) return null;

    try {
        const valid = crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature));
        if (!valid) return null;

        const parsedPayload = JSON.parse(Buffer.from(payload, 'base64url').toString());
        if (parsedPayload.exp && parsedPayload.exp < Math.floor(Date.now() / 1000)) {
            return null;
        }

        const { id, login, email } = parsedPayload;
        if (!id || !login || !email) return null;
        return { id, login, email };
    } catch (e) {
        return null;
    }
};

const parseCookies = (cookieHeader?: string) => {
    if (!cookieHeader) return {} as Record<string, string>;

    return cookieHeader.split(';').reduce(
        (acc, cookie) => {
            const [key, ...val] = cookie.trim().split('=');
            if (key) acc[key] = decodeURIComponent(val.join('='));
            return acc;
        },
        {} as Record<string, string>,
    );
};

export const restoreUser = (req: Request, res: Response, next: NextFunction) => {
    const cookies = parseCookies(req.headers.cookie);
    const user = verifyAuthToken(cookies[AUTH_COOKIE_NAME]);
    if (user) {
        req.user = user;
        res.locals.user = user;
    } else {
        res.locals.user = null;
    }
    next();
};

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) return res.status(401).send('Unauthorized');
    next();
};

export const setAuthCookie = (res: Response, token: string) =>
    res.cookie(AUTH_COOKIE_NAME, token, {
        httpOnly: true,
        sameSite: 'lax',
    });

export const clearAuthCookie = (res: Response) => res.clearCookie(AUTH_COOKIE_NAME);
