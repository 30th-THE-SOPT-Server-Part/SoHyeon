import { Router } from "express";
import upload from "../config/multer";
import FileController from "../controllers/FileController";

const router: Router = Router();

/**
 * single: 파일 1개, req.file로 받아옴
 * array: 파일 여러개, req.file로 받아옴
 */
router.post("/upload", upload.single("file"), FileController.uploadFileTo3);

export default router;
