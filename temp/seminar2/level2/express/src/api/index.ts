import express, { Router } from 'express';

const router: Router = express.Router();

router.use('/user', require('./user'));     // => user.ts
router.use('/blog', require('./blog'));     // => blog.ts
router.use('/like', require('./like'));     // => like.ts
router.use('/signup', require('./signup')); // => signup.ts

module.exports = router;