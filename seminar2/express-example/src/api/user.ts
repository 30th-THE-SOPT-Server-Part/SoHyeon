import express, { Request, Response, Router } from 'express';
// express 모듈에서 타입 정의를 위해 불러옴

const router: Router = express.Router(); // 라우터 받아와서 저장

router.get('/', (req: Request, res: Response) => {
    return res.status(200).json({
        status: 200,
        message: '유저 조회 성공'
    });
});

module.exports = router; // 생성한 라우터 객체를 모듈로 반환