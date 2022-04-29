import mongoose from "mongoose";
import { UserInfo } from "../interfaces/user/UserInfo";

// 타입은 몽구스 홈페이지에서 참고해서 정확하게
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }, 
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    age: {
        type: Number
    },
    school: {
        name: { type: String },
        major: { type: String }
    }
});

export default mongoose.model<UserInfo & mongoose.Document>("User", UserSchema);