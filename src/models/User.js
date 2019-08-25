import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: { type: String },
    user_name: { type: String },
    password: { type: String },
    height: { type: Number },
    weight_history: [
        {
            weight: { type: Number }, 
            date: { type: Date, default: new Date() }
        }
    ]
});

const User = mongoose.model('user', UserSchema);

export default User;