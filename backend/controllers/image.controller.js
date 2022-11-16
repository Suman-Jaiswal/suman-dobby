import ImageService from "../services/image.service.js";
import asyncHandler from "express-async-handler";

export default class ImageController {
   constructor() {
      this.imageService = new ImageService();
   }

   getAllImages = asyncHandler(async (req, res) => {
      const images = await this.imageService.findAllImages();
      res.json(images);
   })
}