"use strict";
// 토큰을 헤더에서 받아와 검증하는 작업
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const responseMessage_1 = __importDefault(require("../modules/responseMessage"));
const statusCode_1 = __importDefault(require("../modules/statusCode"));
const util_1 = __importDefault(require("../modules/util"));
const config_1 = __importDefault(require("../config"));
exports.default = (req, res, next) => {
    var _a;
    // request-header에서 토큰 받아오기 : Bearer token 파싱해서 토큰만 가져오기
    const token = (_a = req.headers["authorization"]) === null || _a === void 0 ? void 0 : _a.split(' ').reverse()[0];
    // 토큰 유무 검증 : 토큰이 없는 경우 401 에러 반환 - 접근 금지
    if (!token) {
        return res.status(statusCode_1.default.UNAUTHORIZED).send(util_1.default.fail(statusCode_1.default.UNAUTHORIZED, responseMessage_1.default.NULL_VALUE_TOKEN));
    }
    try {
        // jwt.verficy(token, secret key) -> jwt token 해독
        const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwtSecret);
        // payload 꺼내오기 -> decoded 타입 단언 필요
        req.body.user = decoded.user;
        // next -> middleware 끝나면 다음으로 넘기기
        next();
    }
    catch (error) {
        console.log(error);
        // TokenExpiredError 발생 시 401 반환
        if (error.name === 'TokenExpiredError') {
            return res.status(statusCode_1.default.UNAUTHORIZED).send(util_1.default.fail(statusCode_1.default.UNAUTHORIZED, responseMessage_1.default.INVALID_TOKEN));
        }
        res.status(statusCode_1.default.INTERNAL_SERVER_ERROR).send(util_1.default.fail(statusCode_1.default.INTERNAL_SERVER_ERROR, responseMessage_1.default.INTERNAL_SERVER_ERROR));
    }
};
//# sourceMappingURL=auth.js.map