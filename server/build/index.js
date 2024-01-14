"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app_1 = __importDefault(require("./app"));
const db_1 = __importDefault(require("./db"));
const PORT = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3000;
(0, db_1.default)();
app_1.default.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
});
