import express from 'express';
const router = express.Router();
import ImageController from '../controllers/image.controller.js'

const imageController = new ImageController();

router.get('/', imageController.getAllImages);

export default router;