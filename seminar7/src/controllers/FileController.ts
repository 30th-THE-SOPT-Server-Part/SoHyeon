import express, { Request, response, Response } from "express";
import mongoose from "mongoose";
import { FileInfo } from "../interfaces/file/FileInfo";
import message from "../modules/responseMessage";
import statusCode from "../modules/statusCode";
import util from "../modules/util";
import FileService from "../services/FileService";

const uploadFileTo3 = async (req: Request, res: Response) => {
  if (!req.file)
    return res
      .status(statusCode.BAD_REQUEST)
      .send(util.fail(statusCode.BAD_REQUEST, message.BAD_REQUEST));

  // req.file은 기본 Express.Multer.File 타입으로 추론되어서 MulterS3.File로 타입 단언
  const image: Express.MulterS3.File = req.file as Express.MulterS3.File;
  const { originalname, location } = image;

  try {
    const data = await FileService.createFile(location, originalname);

    res
      .status(statusCode.CREATED)
      .send(
        util.success(statusCode.CREATED, message.CREATE_FILE_SUCCESS, data)
      );
  } catch (error) {
    console.log(error);
    res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .send(
        util.fail(
          statusCode.INTERNAL_SERVER_ERROR,
          message.INTERNAL_SERVER_ERROR
        )
      );
  }
};

export default {
  uploadFileTo3,
};
