import express, { Router } from 'express';

const router: Router = express.Router(); // express 라우팅 시스템 받아오기

router.use('/user', require('./user'));
// router.use

module.exports = router; // 라우터 객체 모듈로 반환