import express, { Request, Response, NextFunction } from 'express';

// express 객체 받아오기
const app = express();

// express에서 request body를 json으로 받아올 것
app.use(express.json());

// use -> 모든 요청
app.use('/api', require('./api'));
// localhost:8000/api -> api 폴더
// localhost:8000/api/user -> user.ts


// get -> http method
app.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.send('Hi! My name is sohyeon. 내일 월요일 ㅠㅠ');
});
// + app.post, app.put, app.delete


// 8000번 포트에서 서버 실행
app.listen('8000',  () => {
    console.log(`
    #############################################
    🛡️ Server listening on port: 8000 🛡️
    #############################################
    `);
});