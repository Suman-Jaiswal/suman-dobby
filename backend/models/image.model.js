import db from 'mongoose';

const imageSchema = new db.Schema({
   name: { type: String, required: true },
   image: { type: Buffer, required: true },
   userId: { type: String, required: true },
});


export default db.model('Image', imageSchema);