import UserService from "../services/user.service.js";
import asyncHandler from "express-async-handler";

class UserController {
   constructor() {
      this.userService = new UserService();
   }

   getUser = asyncHandler(async (req, res) => {
      const user = await this.userService.getUser();
      res.json(user);
   })
}

export default UserController;