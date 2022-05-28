import { PostBaseResponseDto } from "../interfaces/common/PostBaseResponseDto";
import { UserCreateDto } from "../interfaces/user/UserCreateDto";
import { UserResponseDto } from "../interfaces/user/UserResponseDto";
import { UserUpdateDto } from "../interfaces/user/userUpdateDto";
import User from "../models/User";
import bcrypt from "bcryptjs";
import { UserSignInDto } from "../interfaces/user/UserSignInDto";

const createUser = async (userCreateDto: UserCreateDto): Promise<PostBaseResponseDto|null> => {
    try {

        // user email이 이미 존재하는지 검사 -> 409 duplicated
        const existUser = await User.findOne({
            email: userCreateDto.email
        });
        if (existUser) return null;

        const user = new User({
            name: userCreateDto.name,
            phone: userCreateDto.phone,
            email: userCreateDto.email,
            password: userCreateDto.password,
            age: userCreateDto.age,
            school: userCreateDto.school
        });

        const salt = await bcrypt.genSalt(10); // 아주 작은 임의의 랜덤한 텍스트

        // plain text + salt >> hashing >> hashed text
        user.password = await bcrypt.hash(userCreateDto.password, salt);

        await user.save();

        const data = {
            _id: user.id
        };

        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const updateUser = async (userId: string, userUpdateDto: UserUpdateDto) => {
    try {
        // findByIdUpdate
        await User.findByIdAndUpdate(userId, userUpdateDto);
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const findUserById = async (userId: string): Promise<UserResponseDto | null> => {
    try {
        const user = await User.findById(userId);

        console.log(`user: ${user}`);

        if (!user) {
            return null;
        }

        return user;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const deleteUser = async (userId: string) => {
    try {
        await User.findByIdAndDelete(userId);
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const signInUser = async (userSignInDto: UserSignInDto) : Promise<PostBaseResponseDto | null | number> => {
    try {
        const user = await User.findOne({
            email: userSignInDto.email
        });
        if (!user) return null; // user email 존재하지 않는 경우 처리

        // bcrypt가 원래 password와 현재 보낸 password eowh : match 되지 않으면 401 반환
        const isMatch = await bcrypt.compare(userSignInDto.password, user.password);
        if (!isMatch) return 401;

        const data = {
            _id: user._id
        };

        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export default {
    createUser,
    updateUser,
    findUserById,
    deleteUser,
    signInUser
}