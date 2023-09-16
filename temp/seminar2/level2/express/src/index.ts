import express, { Request, Response, NextFunction } from 'express';

const app = express(); // express 객체 받아오기

// express에서 request body를 json으로 받아오기
app.use(express.json());

// use -> 모든 요청
app.use('/api', require('./api'));
// localhost:8000/api -> api 폴더
// localhost:8000/api/user -> user.ts
// localhost:8000/api/blog -> blog.ts
// localhost:8000/api/signup -> signup.ts
// localhost:8000/api/like -> like.ts

app.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.send('Hi! My name is sohyeon! This is level2 assignment!');
});

app.listen('8000', () => {
    console.log(`
    #############################################
    🛡️ Server listening on port: 8000 🛡️
    #############################################
    `);
})