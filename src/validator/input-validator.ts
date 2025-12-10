export const inputValidator = {
    validateUserRegistration(data: any) {
        const errors: string[] = [];
        if (!data.login || data.login.length < 3) errors.push('Login must be at least 3 chars');
        if (!data.email || !data.email.includes('@')) errors.push('Invalid email format');
        if (!data.password || data.password.length < 6) errors.push('Password must be at least 6 chars');
        return errors.length > 0 ? errors : null;
    },

    validateReview(data: any) {
        if (!data.rating || data.rating < 1 || data.rating > 10) return 'Rating must be between 1 and 10';
        if (!data.comment || data.comment.length < 5) return 'Comment is too short';
        return null;
    },
};
