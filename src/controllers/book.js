import { Book, Category, Author } from '../models';
import * as Yup from 'yup';

class BookController {
async create(req, res){
try {
const schema = Yup.object().shape({
category_id: Yup.number().required('Category is mandatory'),
author_id: Yup.number().required('Author is mandatory'),
name: Yup.string().required(),
cover_url: Yup.string().url('Cover must be a valid URL'),
release_date: Yup.date('Release date must be a valid format'),
pages: Yup.number(),
synopsis: Yup.string(),
highlighted: Yup.boolean(),
});

await schema.validate(req.body);

const {category_id, author_id} = req.body;

const category = await Category.findByPk(category_id);

if(!category) {
return res.status(404).json({error: 'Category not found'})
};

const author = await Author.findByPk(author_id);

if(!author) {
return res.status(404).json({error: 'Author not found'})
};

const book = await new Book({
...req.body,
});

await book.save();

return res.json(book);
} catch (error) {
res.status(400).json({error: error?.message});
} 
}

async findAll(req, res) {
    try {
        const books = await Book.findAll({
            include: [
            {
                model: Author,
                as: 'author',
            },
            {
                model: Category,
                as: 'category',
            },
        ],
        });
        return res.json(books);
    } catch (error) {
        res.status(400).json({error: error?.message});
    }
}

}

export default new BookController();
