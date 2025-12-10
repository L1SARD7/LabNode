import { UserViewModel } from '../../models/UserViewModel';

declare global {
    namespace Express {
        interface Request {
            user?: UserViewModel;
        }
    }
}
s;
