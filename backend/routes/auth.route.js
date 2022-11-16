import express from 'express';
import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.get('/register', (req, res) => {
   const doc = { ...req.body }
   if (doc.name == '' || doc.email == '' || doc.password == '') {
      res.status(400).json({ message: 'Please fill in all fields' });
   }

   const user = User.findOne({ email: doc.email });

   if (user) {
      res.status(400).json({ message: 'User already exists' });
   }



});

router.get('/login', (req, res) => {
   res.send('login!');
});

export default router;