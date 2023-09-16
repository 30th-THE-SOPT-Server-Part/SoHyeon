"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const getToken = (userId) => {
    const payload = {
        user: {
            id: userId
        }
    };
    const accesssToken = jsonwebtoken_1.default.sign(// -> 암호화
    payload, config_1.default.jwtSecret, { expiresIn: '2h' } // expiresIn -> 유효기간(2시간)
    );
    return accesssToken;
};
exports.default = getToken;
//# sourceMappingURL=jwtHandler.js.map