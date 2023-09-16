import express, { Request, Response } from "express";
import message from "../modules/responseMessage";
import statusCode from "../modules/statusCode";
import util from "../modules/util";
import { FileService } from "../services";


const uploadFileToS3 = async (req: Request, res: Response) => {
  // validation 처리
  if (!req.file) return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, message.BAD_REQUEST));

  // req.file은 기본 Express.Multer.File 타입으로 추론되어서 MulterS3.File로 타입 단언
  const image: Express.MulterS3.File = req.file as Express.MulterS3.File;
  const { originalname, location } = image;

  try {
    const data = await FileService.createFile(location, originalname);

    res.status(statusCode.CREATED).send(util.success(statusCode.CREATED, message.CREATE_FILE_SUCCESS, data));
  } catch (error) {
    console.log(error);
    res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
  }
};

const uploadFilesToS3 = async (req: Request, res: Response) => {

  // 유효성 체크
  if (!req.files) return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, message.BAD_REQUEST));

  const images: Express.MulterS3.File[] = req.files as Express.MulterS3.File[];

  try {
    // 받아온 file들을 가공하는 작업
    // Promise.all을 이용해서 서로 연관성 없는 작업은 동시에 실행 (시간 줄이기용)
    const imageList: {
      location: string,
      originalname: string
    }[] = await Promise.all(images.map((image: Express.MulterS3.File) => {
      return {
        location: image.location,
        originalname: image.originalname
      };
    }));

    const data = await FileService.createFiles(imageList);

    res.status(statusCode.CREATED).send(util.success(statusCode.CREATED, message.CREATE_FILE_SUCCESS, data));

  } catch (error) {
    console.log(error);
    res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
  }

}

export default {
  uploadFileToS3,
  uploadFilesToS3
};
