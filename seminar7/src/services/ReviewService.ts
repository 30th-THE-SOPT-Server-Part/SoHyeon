import { PostBaseResponseDto } from "../interfaces/common/PostBaseResponseDto";
import { ReviewCreateDto } from "../interfaces/review/ReviewCreateDto";
import { ReviewInfo } from "../interfaces/review/ReviewInfo";
import { ReviewOptionType } from "../interfaces/review/ReviewOptionType";
import { ReviewResponseDto } from "../interfaces/review/ReviewResponseDto";
import { ReviewsResponseDto } from "../interfaces/review/ReviewsResponseDto";
import Review from "../models/Review";

const createReview = async (movieId: string, reviewCreateDto: ReviewCreateDto): Promise<PostBaseResponseDto> => {
    try {
        const review = new Review({
            title: reviewCreateDto.title,
            content: reviewCreateDto.content,
            writer: reviewCreateDto.writer,
            movie: movieId
        });

        await review.save();

        const data = {
            _id: review._id
        };

        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const getReviews = async (movieId : string): Promise<ReviewResponseDto[]> => {
    try {
        const reviews = await Review.find({
            movie: movieId
        }).populate('writer', 'name').populate('movie');

        const data = await Promise.all(reviews.map((review: any) => {
            const result = {
                writer: review.writer.name,
                movie: review.movie,
                title: review.title,
                content: review.content
            };

            return result;
        }))

        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const getReviewBySearch = async (movieId:string, search: string, option: ReviewOptionType, page: number): Promise<ReviewsResponseDto> => {
    const regex = (pattern: string) => new RegExp(`.*${pattern}.*`);

    let reviews: ReviewInfo[] = [];
    const perPage: number = 2;

    try {
        const reviewRegex: RegExp = regex(search);

        if (option === 'title') {
            reviews = await Review.find({ title: { $regex: reviewRegex } })
                .where('movie').equals(movieId)
                .populate(['movie', 'writer'])
                .sort({ createAt: -1 })
                .skip(perPage * (page - 1))
                .limit(perPage);
        } else if (option === 'content') {
            reviews = await Review.find({ content: { $regex: reviewRegex } })
                .where('movie').equals(movieId)
                .populate(['movie', 'writer'])
                .sort({ createAt: -1 })
                .skip(perPage * (page - 1))
                .limit(perPage);
        } else {
            reviews = await Review.find({
                $or: [
                    { title: { $regex: reviewRegex } },
                    { content: { $regex: reviewRegex } }
                ]
            })
                .where('movie').equals(movieId)
                .populate(['movie', 'writer'])
                .sort({ createAt: -1 })
                .skip(perPage * (page - 1))
                .limit(perPage);
        }

        const total: number = await Review.countDocuments({});
        const lastPage: number = Math.ceil(total / perPage);

        const data = {
            reviews,
            lastPage
        }

        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export default {
    createReview,
    getReviews,
    getReviewBySearch
}