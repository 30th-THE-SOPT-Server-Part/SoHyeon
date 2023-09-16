import express, { Router } from 'express';

// express 라우팅 시스템 받아오기
const router: Router = express.Router();

// router.use
router.use('/user', require('./user'));

// 라우터 객체 모듈로 반환
module.exports = router;