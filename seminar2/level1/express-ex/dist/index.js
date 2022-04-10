"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.get('/', (req, res, next) => {
    res.send('Hi! My name is sohyeon. 내일 월요일 ㅠㅠ');
});
app.listen('8000', () => {
    console.log(`
    #############################################
    🛡️ Server listening on port: 8000 🛡️
    #############################################
    `);
});
//# sourceMappingURL=index.js.map