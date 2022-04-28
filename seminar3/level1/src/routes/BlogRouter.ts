import { Router } from "express";
import BlogController from "../controllers/BlogController";

const router: Router = Router();

// /blog
router.post('/', BlogController.createBlog);

export default router;