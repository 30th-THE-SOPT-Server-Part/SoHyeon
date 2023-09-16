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
const Movie_1 = __importDefault(require("../models/Movie"));
const createMovie = (moviecreateDto) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const movie = new Movie_1.default(moviecreateDto);
        yield movie.save();
        const data = {
            _id: movie._id
        };
        return data;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
});
const getMovie = (movieId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const movie = yield Movie_1.default.findById(movieId).populate('comments.writer');
        if (!movie)
            return null;
        return movie;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
});
const updateMovie = (movieId, movieUpdateDto) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Movie_1.default.findByIdAndUpdate(movieId, movieUpdateDto);
    }
    catch (error) {
        console.log(error);
        throw error;
    }
});
const deleteMovie = (movieId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Movie_1.default.findByIdAndDelete(movieId);
    }
    catch (error) {
        console.log(error);
        throw error;
    }
});
const createMovieComment = (movieId, movieCommentCreateDto) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const movie = yield Movie_1.default.findById(movieId);
        if (!movie)
            return null;
        const newComents = [...movie.comments, movieCommentCreateDto];
        const updatedMovie = yield Movie_1.default.findOneAndUpdate({ _id: movieId }, { comments: newComents }, { new: true });
        return updatedMovie;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
});
const updateMovieComment = (movieId, commentId, userId, movieCommentUpdateDto) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const movie = yield Movie_1.default.findById(movieId);
        if (!movie)
            return null;
        const data = yield Movie_1.default.findOneAndUpdate({ _id: movieId, comments: { $elemMatch: { _id: commentId, writer: userId } } }, {
            $set: {
                'comments.$.writer': userId,
                'comments.$.comment': movieCommentUpdateDto.comment
            }
        }, { new: true });
        return data;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
});
exports.default = {
    createMovie,
    getMovie,
    updateMovie,
    deleteMovie,
    createMovieComment,
    updateMovieComment
};
//# sourceMappingURL=MovieService.js.map