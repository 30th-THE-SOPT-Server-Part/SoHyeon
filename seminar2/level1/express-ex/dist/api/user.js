"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// express 모듈에서 타입 정의를 위해 불러옴
const express_1 = __importDefault(require("express"));
// 라우터를 받아와서 저장
const router = express_1.default.Router();
router.get('/', (req, res) => {
    return res.status(200).json({
        status: 200,
        message: '유저 조회 성공'
    });
});
// 생성한 라우터 객체를 모듈로 반환
module.exports = router;
//# sourceMappingURL=user.js.map