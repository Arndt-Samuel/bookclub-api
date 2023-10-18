import {Author} from '../models'
import * as Yup from 'yup';

class AuthorController{
    async create(req, res){
        try {
            const schema = Yup.object().shape({
                name: Yup.string().required('Name is mandatory').min(3, 'Name must have at least 3 characters'),
                avatar_url: Yup.string().url('Avatar URL must be in URL format'),
            });

            await schema.validate(req.body);

            const createdAuthor = await new Author({
                ...req.body,
            });

            await createdAuthor.save();

            return res.json({ createdAuthor })
        } catch (error) {
            res.status(400).json({error: error?.message})
        }
    }

    async getAll(req, res){
        try {
            const authors = await Author.findAll({order: [
                ['name', 'ASC']
            ]
        });
            return res.json(authors);
        }
         catch (error) {
            res.status(400).json({error: error?.message})
        }
    }
}

export default new AuthorController();