"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router(); // express 라우팅 시스템 받아오기
router.use('/user', require('./user'));
// router.use
module.exports = router; // 라우터 객체 모듈로 반환
//# sourceMappingURL=index.js.map