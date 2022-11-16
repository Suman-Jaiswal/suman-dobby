import express from 'express';
const router = express.Router();
import UserController from '../controllers/user.controller.js'

const userController = new UserController();

router.route('/').get(userController.getUser);

export default router;