"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ReviewSchema = new mongoose_1.default.Schema({
    writer: {
        type: mongoose_1.default.Types.ObjectId,
        required: true,
        ref: "User"
    },
    movie: {
        type: mongoose_1.default.Types.ObjectId,
        required: true,
        ref: "Movie"
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String
    }
});
exports.default = mongoose_1.default.model("Review", ReviewSchema);
//# sourceMappingURL=Review.js.map