"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)(); // express 객체 받아오기
// express에서 request body를 json으로 받아오기
app.use(express_1.default.json());
// use -> 모든 요청
app.use('/api', require('./api'));
// localhost:8000/api -> api 폴더
// localhost:8000/api/user -> user.ts
// localhost:8000/api/blog -> blog.ts
// localhost:8000/api/signup -> signup.ts
// localhost:8000/api/like -> like.ts
app.get('/', (req, res, next) => {
    res.send('Hi! My name is sohyeon! This is level2 assignment!');
});
app.listen('8000', () => {
    console.log(`
    #############################################
    🛡️ Server listening on port: 8000 🛡️
    #############################################
    `);
});
//# sourceMappingURL=index.js.map