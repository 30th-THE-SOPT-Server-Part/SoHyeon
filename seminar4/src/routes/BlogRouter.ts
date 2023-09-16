import { Router } from "express";
import BlogController from "../controllers/BlogController";

const router: Router = Router();

// /blog
router.post('/', BlogController.createBlog);
router.put('/:blogId', BlogController.updateBlog);
router.get('/:blogId', BlogController.findBlogById);
router.delete('/:blogId', BlogController.deleteBlog);

export default router;