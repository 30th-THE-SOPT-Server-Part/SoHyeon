import { BlogCreateDto } from "../interfaces/blog/BlogCreateDto";
import { PostBaseResponseDto } from "../interfaces/common/PostBaseResponseDto";
import Blog from "../models/Blog";

const createBlog = async (blogCreateDto: BlogCreateDto): Promise<PostBaseResponseDto> => {
    try {
        const blog = new Blog({
            title: blogCreateDto.title,
            content: blogCreateDto.content,
            writer: blogCreateDto.writer
        });

        await blog.save();

        const data = {
            _id: blog.id
        };

        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export default {
    createBlog
}