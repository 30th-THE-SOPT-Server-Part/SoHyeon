"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// express 객체 받아오기
const app = (0, express_1.default)();
// express에서 request body를 json으로 받아올 것
app.use(express_1.default.json());
// use -> 모든 요청
app.use('/api', require('./api'));
// localhost:8000/api -> api 폴더
// localhost:8000/api/user -> user.ts
// get -> http method
app.get('/', (req, res, next) => {
    res.send('Hi! My name is sohyeon. 내일 월요일 ㅠㅠ');
});
// + app.post, app.put, app.delete
// 8000번 포트에서 서버 실행
app.listen('8000', () => {
    console.log(`
    #############################################
    🛡️ Server listening on port: 8000 🛡️
    #############################################
    `);
});
//# sourceMappingURL=index.js.map