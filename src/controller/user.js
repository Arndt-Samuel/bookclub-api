import { User } from '../models';

class UserController {
    async create(req, res) {
        const user = new User({
            name: 'Samuel',
            email: 'samuel@test.com',
            password: 'test123',
            password_hash: 'test123',
            reset_password_token: 'test',
            reset_password_token_sent_at: new Date(),
            avatar_url: 'test_url',
        })

        await user.save();
        
        return res.json({ user });
    }
}

export default new UserController();