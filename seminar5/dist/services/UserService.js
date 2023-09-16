"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../models/User"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const createUser = (userCreateDto) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // user email이 이미 존재하는지 검사 -> 409 duplicated
        const existUser = yield User_1.default.findOne({
            email: userCreateDto.email
        });
        if (existUser)
            return null;
        const user = new User_1.default({
            name: userCreateDto.name,
            phone: userCreateDto.phone,
            email: userCreateDto.email,
            password: userCreateDto.password,
            age: userCreateDto.age,
            school: userCreateDto.school
        });
        const salt = yield bcryptjs_1.default.genSalt(10); // 아주 작은 임의의 랜덤한 텍스트
        // plain text + salt >> hashing >> hashed text
        user.password = yield bcryptjs_1.default.hash(userCreateDto.password, salt);
        yield user.save();
        const data = {
            _id: user.id
        };
        return data;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
});
const updateUser = (userId, userUpdateDto) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // findByIdUpdate
        yield User_1.default.findByIdAndUpdate(userId, userUpdateDto);
    }
    catch (error) {
        console.log(error);
        throw error;
    }
});
const findUserById = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findById(userId);
        console.log(`user: ${user}`);
        if (!user) {
            return null;
        }
        return user;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
});
const deleteUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield User_1.default.findByIdAndDelete(userId);
    }
    catch (error) {
        console.log(error);
        throw error;
    }
});
const signInUser = (userSignInDto) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findOne({
            email: userSignInDto.email
        });
        if (!user)
            return null; // user email 존재하지 않는 경우 처리
        // bcrypt가 원래 password와 현재 보낸 password eowh : match 되지 않으면 401 반환
        const isMatch = yield bcryptjs_1.default.compare(userSignInDto.password, user.password);
        if (!isMatch)
            return 401;
        const data = {
            _id: user._id
        };
        return data;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
});
exports.default = {
    createUser,
    updateUser,
    findUserById,
    deleteUser,
    signInUser
};
//# sourceMappingURL=UserService.js.map