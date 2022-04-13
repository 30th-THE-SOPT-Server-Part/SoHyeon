"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)(); // express 객체 받아오기
app.use(express_1.default.json()); // express에서 request body를 json으로 받아올 것
app.use('/api', require('./api')); // use -> 모든 요청
// localhost:8000/api -> api 폴더
// localhost:8000/api/user -> user.ts
app.get('/', (req, res, next) => {
    res.send('Hi! My name is Sohyeon! 배고파아');
}); // get -> http method
// + app.post, app.put, app.delete
app.listen('8000', () => {
    console.log(`
        #############################################
            🛡️ Server listening on port: 8000 🛡️
        #############################################
    `);
}); // 8000번 포트에서 서버 실행
//# sourceMappingURL=index.js.map