import { Router } from "express";
import authMiddleware from '../middlewares/auth';
import UserController from '../controllers/user';

const routes = new Router();
// ---- unauthenticated routes ----
routes.post('/user', UserController.create)
routes.post('/login', UserController.login)


// ---- authenticated routes ----
routes.use(authMiddleware);
routes.get('/user', UserController.get)

export default routes;
