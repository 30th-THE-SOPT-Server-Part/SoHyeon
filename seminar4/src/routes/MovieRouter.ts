import { Router } from "express";
import { body } from "express-validator";
import { MovieController } from "../controllers";

const router: Router = Router();

router.post('/', [
    body('title').notEmpty(),
    body('director').notEmpty(),
    body('story').notEmpty()
], MovieController.createMovie);

router.get('/:movieId', MovieController.getMovie);

export default router;