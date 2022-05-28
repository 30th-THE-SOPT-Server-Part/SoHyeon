import express, { Request, response, Response } from "express";
import message from "../modules/responseMessage";
import statusCode from "../modules/statusCode";
import util from "../modules/util";

const uploadFileTo3 = async (req: Request, res: Response) => {
  if (!req.file)
    return res
      .status(statusCode.BAD_REQUEST)
      .send(util.fail(statusCode.BAD_REQUEST, message.BAD_REQUEST));

  const image: Express.Multer.File = req.file;
};
