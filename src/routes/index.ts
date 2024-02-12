import express from 'express';
import userRoute from './user.route';

const router = express.Router();

// Configuration of routes
const routes = [{ path: '/auth', route: userRoute }];

routes.forEach((route) => router.use(route.path, route.route));

export default router;
