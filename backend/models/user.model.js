import db from 'mongoose';

const userSchema = new db.Schema({
   name: { type: String, required: true },
   email: { type: String, required: true },
   hash: { type: String, required: true },
});

export default db.model('User', userSchema);
