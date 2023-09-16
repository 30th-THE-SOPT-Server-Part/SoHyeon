"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const MovieSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true
    },
    director: {
        type: String,
        required: true
    },
    startDate: {
        type: Date
    },
    thumbnail: {
        type: String
    },
    story: {
        type: String
    },
    comments: [{
            writer: {
                type: mongoose_1.default.Types.ObjectId,
                required: true,
                ref: "User"
            },
            comment: {
                type: String,
                required: true
            }
        },
        {
            timestamps: true
        }]
}, {
    timestamps: true
});
exports.default = mongoose_1.default.model("Movie", MovieSchema);
//# sourceMappingURL=Movie.js.map