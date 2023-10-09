import { User } from '../models';
import * as Yup from 'yup';
import bcrypt from 'bcrypt';

class UserController {
    async create(req, res) {
        try {
            const schema = Yup.object().shape({
                name: Yup.string().required('Name is mandatory').min(3, 'Name must have at least 3 characters'),
                email: Yup.string().required('E-mail is mandatory').email('E-mail invalid'),
                password: Yup.string().required('Password is mandatory').min(6, 'The password must have at least 6 characters'),
            });
    
            const existedUser = await User.findOne({ where: { email: req.body.email } });

            if (existedUser) {
                return res.status(400).json({error: 'User already exists'})
            }

            await schema.validate(req.body);
    
            const hashPasswords = await bcrypt.hash(req.body.password, 8)
    
            const user = new User({
                ...req.body,
                password: '',
                password_hash: hashPasswords,
            })
    
            await user.save();
            
            return res.json({ user });
        } catch (error) {
            return res.status(400).json({error: error.message});
        }
        
    }
}

export default new UserController();