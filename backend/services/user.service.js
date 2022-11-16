import User from '../models/user.model.js'

export default class UserService {
   constructor() {
      this.user = User;
   }

   async getUser(userId) {
      const user = await this.user.find({});
      return user;
   }
}