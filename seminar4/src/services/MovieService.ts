import { PostBaseResponseDto } from "../interfaces/common/PostBaseResponseDto";
import { MovieCreateDto } from "../interfaces/movie/MovieCreateDto";
import { MovieResponseDto } from "../interfaces/movie/MovieResponseDto";
import { MovieUpdateDto } from "../interfaces/movie/MovieUpdateDto";
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

const getMovie = async (movieId : string): Promise<MovieResponseDto | null> => {
    try {
        const movie = await Movie.findById(movieId);

        console.log(`movie: ${movie}`);

        if (!movie) {
            return null;
        }

        return movie;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const updateMovie = async (movieId: string, movieUpdateDto: MovieUpdateDto) => {
    try {
        await Movie.findByIdAndUpdate(movieId, movieUpdateDto);
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const deleteMovie =async (movieId:string) => {
    try {
        await Movie.findByIdAndDelete(movieId);
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export default {
    createMovie,
    getMovie,
    updateMovie,
    deleteMovie
}