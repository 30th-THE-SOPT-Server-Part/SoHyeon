import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { JwtPayloadInfo } from "../interfaces/common/JwtPayloadInfo";
import config from "../config";

const getToken = (userId: mongoose.Schema.Types.ObjectId): string => {
    const payload: JwtPayloadInfo = {
        user: {
            id: userId
        }
    };

    const accesssToken: string = jwt.sign( // -> 암호화
        payload,
        config.jwtSecret,
        { expiresIn: '2h' } // expiresIn -> 유효기간(2시간)
    );

    return accesssToken;
};

export default getToken;