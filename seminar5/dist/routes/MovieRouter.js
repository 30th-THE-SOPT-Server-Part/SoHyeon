"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const controllers_1 = require("../controllers");
const auth_1 = __importDefault(require("../middlewares/auth"));
const router = (0, express_1.Router)();
router.post('/', [
    (0, express_validator_1.body)('title').notEmpty(),
    (0, express_validator_1.body)('director').notEmpty()
], controllers_1.MovieController.createMovie);
router.get('/:movieId', controllers_1.MovieController.getMovie);
router.put('/:movieId', controllers_1.MovieController.updateMovie);
router.delete('/:movieId', controllers_1.MovieController.deleteMovie);
router.post('/:movieId/comment', [
    (0, express_validator_1.body)('writer').notEmpty(),
    (0, express_validator_1.body)('comment').notEmpty()
], controllers_1.MovieController.createMovieComment);
router.put('/:movieId/comments/:commentId', [
    (0, express_validator_1.body)('comment').notEmpty()
], auth_1.default, controllers_1.MovieController.updateMovieComment);
exports.default = router;
//# sourceMappingURL=MovieRouter.js.map