import { Router } from "express";
import upload from "../config/multer";
import { FileController } from "../controllers";



const router: Router = Router();

/**
 * single: 파일 1개, req.file로 받아옴
 * array: 파일 여러개, req.file로 받아옴
 */
router.post('/upload', upload.single('file'), FileController.uploadFileToS3);

// upload.array('file name', maxCount) => 최대 개수 지정 가능
router.post('/uploads', upload.array('file'), FileController.uploadFilesToS3);

export default router;
