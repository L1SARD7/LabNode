import { userRepository } from '../repositories/user-db-repository';

export const userService = {
    async registerUser(login: string, email: string, password: string) {
        const passwordHash = password + '_secret_salt';
        return await userRepository.createUser(login, email, passwordHash);
    },

    async checkCredentials(login: string, password: string) {
        const user = await userRepository.findUserByLogin(login);
        if (!user) return null;

        if (user.password === password + '_secret_salt') {
            const { password, ...userWithoutPass } = user;
            return userWithoutPass;
        }
        return null;
    },
};
