import config from ".";
import multer from "multer";
import multerS3 from "multer-s3";
import s3 from "./s3Config";

// 미들웨어로 사용할 multer 생성
const upload = multer({
  storage: multerS3({
    /**
     * s3: 실질적인 storage는 multerS3 이용해 aws s3로 설정
     * bucket: s3 bucket name 지정
     * contentType: mimetype은 자동으로 설정
     * acl: Access control for the file
     * key: 파일 이름 정의, bucket 내에서 이름이 겹치면 동일 파일로 인식해서 보통 고유하게 만든다.
     */
    s3: s3,
    bucket: config.bucketName,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: "public-read",
    key: function (req: Express.Request, file: Express.MulterS3.File, cb) {
      cb(null, `${Date.now()}_${file.originalname}`);
    },
  }),
});

export default upload;
