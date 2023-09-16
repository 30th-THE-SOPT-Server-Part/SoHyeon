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
const Review_1 = __importDefault(require("../models/Review"));
const createReview = (movieId, reviewCreateDto) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const review = new Review_1.default({
            title: reviewCreateDto.title,
            content: reviewCreateDto.content,
            writer: reviewCreateDto.writer,
            movie: movieId
        });
        yield review.save();
        const data = {
            _id: review._id
        };
        return data;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
});
const getReviews = (movieId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reviews = yield Review_1.default.find({
            movie: movieId
        }).populate('writer', 'name').populate('movie');
        const data = yield Promise.all(reviews.map((review) => {
            const result = {
                writer: review.writer.name,
                movie: review.movie,
                title: review.title,
                content: review.content
            };
            return result;
        }));
        return data;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
});
exports.default = {
    createReview,
    getReviews
};
//# sourceMappingURL=ReviewService.js.map