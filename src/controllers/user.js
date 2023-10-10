import { User } from '../models';
import * as Yup from 'yup';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

class UserController {
    async login(req, res) {
        try {
            const schema = Yup.object().shape({
                email: Yup.string().email('E-mail invalid').required('E-mail is mandatory'),
                password: Yup.string().required('Password is mandatory')
            });

            await schema.validate(req.body);
            
            const user = await User.findOne({ where: { email: req.body.email } });

            if(!user){
                return res.status(401).json({ error: 'E-mail or password do not match' });
            };

            const checkPassword = await bcrypt.compare(req.body.password, user.password_hash);

            if(!checkPassword) {
                return res.status(401).json({ error: 'E-mail or password do not match' })
            };

            
            const token = jwt.sign({id: user.id}, process.env.JWT_HASH, {
                expiresIn: '30d',
            });

            

            const { id, name, email, avatar_url, createdAt } = user;

            return res.json({
                user: {
                id,
                name, 
                email, 
                avatar_url, 
                createdAt,
            },
                token,
            });

        } catch (error) {
            return res.status(400).json({ error: error?.message });
        }
    };


    async create(req, res) {
        try {
            const schema = Yup.object().shape({
                name: Yup.string().required('Name is mandatory').min(3, 'Name must have at least 3 characters'),
                email: Yup.string().required('E-mail is mandatory').email('E-mail invalid'),
                password: Yup.string().required('Password is mandatory').min(6, 'The password must have at least 6 characters'),
            });
    
            
            await schema.validate(req.body);

            const existedUser = await User.findOne({ where: { email: req.body.email } });

            if (existedUser) {
                return res.status(400).json({error: 'User already exists'});
            };

    
            const hashPasswords = await bcrypt.hash(req.body.password, 8)
    
            const user = new User({
                ...req.body,
                password: '',
                password_hash: hashPasswords,
            })
    
            await user.save();
            
            return res.json({ user });
        } catch (error) {
            return res.status(400).json({error: error?.message});
        }
        
    }
}

export default new UserController();