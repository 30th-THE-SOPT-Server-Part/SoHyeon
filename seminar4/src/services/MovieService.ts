import { PostBaseResponseDto } from "../interfaces/common/PostBaseResponseDto";
import { MovieCreateDto } from "../interfaces/movie/MovieCreateDto";
import Movie from "../models/Movie";

const createMovie = async (startDate: Date, moviecreateDto: MovieCreateDto): Promise<PostBaseResponseDto> => {
    try {
        const movie = new Movie({
            title: moviecreateDto.title,
            director: moviecreateDto.director,
            startDate: startDate,
            thumbnail: moviecreateDto.thumbnail,
            story: moviecreateDto.story
        });

        await movie.save();

        const data = {
            _id: movie._id
        };

        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export default {
    createMovie
}