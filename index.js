import express from 'express';
import db from './src/models';
import UserController from './src/controllers/user';

const app = express();

app.post('/', UserController.create);

app.listen(3333, async () => {
    try {
        await db.sequelize.authenticate()
        console.log('App running and db connected')
    } catch (error) {
        console.log('Error running app: ', error)
    }
});