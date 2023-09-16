"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ReviewController_1 = __importDefault(require("../controllers/ReviewController"));
const check_1 = require("express-validator/check");
const auth_1 = __importDefault(require("../middlewares/auth"));
const router = (0, express_1.Router)();
router.post('/movies/:movieId', [
    (0, check_1.body)('title').notEmpty(),
    (0, check_1.body)('writer').notEmpty(),
    (0, check_1.body)('content').notEmpty()
], ReviewController_1.default.createReview);
router.get('/movies/:movieId', auth_1.default, ReviewController_1.default.getReviews);
exports.default = router;
//# sourceMappingURL=ReviewRouter.js.map