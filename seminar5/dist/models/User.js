"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// 타입은 몽구스 홈페이지에서 참고해서 정확하게
const UserSchema = new mongoose_1.default.Schema({
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
    password: {
        type: String,
        required: true
    },
    age: {
        type: Number
    },
    school: {
        name: { type: String },
        major: { type: String }
    }
});
exports.default = mongoose_1.default.model("User", UserSchema);
//# sourceMappingURL=User.js.map