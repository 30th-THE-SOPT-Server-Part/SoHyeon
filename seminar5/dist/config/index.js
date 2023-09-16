"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || "development";
const envFound = dotenv_1.default.config();
if (envFound.error) {
    // This error should crash whole process
    throw new Error("⚠️  Couldn't find .env file  ⚠️");
}
exports.default = {
    // 사용 포트 번호
    port: parseInt(process.env.PORT, 10),
    // MongoDB URI
    mongoURI: process.env.MONGODB_URI,
    // jwt Secret
    jwtSecret: process.env.JWT_SECRET,
    // jwt Algorithm
    jwtAlgo: process.env.JWT_ALGO
};
//# sourceMappingURL=index.js.map