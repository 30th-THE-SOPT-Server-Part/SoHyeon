import dotenv from "dotenv";

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || "development";

const envFound = dotenv.config();
if (envFound.error) {
  // This error should crash whole process

  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
  // 사용 포트 번호
  port: parseInt(process.env.PORT as string, 10) as number,

  // MongoDB URI
  mongoURI: process.env.MONGODB_URI as string,

  // jwt Secret
  jwtSecret: process.env.JWT_SECRET as string,

  // jwt Algorithm
  jwtAlgo: process.env.JWT_ALGO as string,

  /**
   * AWS S3
   */
  s3AccessKey: process.env.S3_ACCESS_KEY as string,
  s3SecretKey: process.env.S3_SECRET_KEY as string,
  bucketName: process.env.BUCKET_NAME as string,
};
