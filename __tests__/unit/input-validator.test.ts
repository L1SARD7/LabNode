import { inputValidator } from '../../src/validator/input-validator';

describe('InputValidator Unit Tests', () => {
    
    describe('validateUserRegistration', () => {
        it('should return null for valid input', () => {
            const validData = { login: 'user1', email: 'test@example.com', password: 'password123' };
            const result = inputValidator.validateUserRegistration(validData);
            expect(result).toBeNull();
        });

        it('should return error for short login', () => {
            const invalidData = { login: 'ab', email: 'test@example.com', password: 'password123' };
            const result = inputValidator.validateUserRegistration(invalidData);
            expect(result).toContain('Login must be at least 3 chars');
        });

        it('should return error for invalid email', () => {
            const invalidData = { login: 'user1', email: 'not-an-email', password: 'password123' };
            const result = inputValidator.validateUserRegistration(invalidData);
            expect(result).toContain('Invalid email format');
        });

        it('should return error for short password', () => {
            const invalidData = { login: 'user1', email: 'test@example.com', password: '123' };
            const result = inputValidator.validateUserRegistration(invalidData);
            expect(result).toContain('Password must be at least 6 chars');
        });
    });

    describe('validateReview', () => {
        it('should return null for valid review', () => {
            const validData = { rating: 8, comment: 'Great game!' };
            const result = inputValidator.validateReview(validData);
            expect(result).toBeNull();
        });

        it('should return error for rating out of range', () => {
            const invalidData = { rating: 11, comment: 'Great game!' };
            const result = inputValidator.validateReview(invalidData);
            expect(result).toBe('Rating must be between 1 and 10');
        });

        it('should return error for short comment', () => {
            const invalidData = { rating: 5, comment: 'Bad' };
            const result = inputValidator.validateReview(invalidData);
            expect(result).toBe('Comment is too short');
        });
    });
});
