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
exports.authRequired = void 0;
const token_libs_1 = require("../libs/token.libs");
const user_models_1 = __importDefault(require("../models/user.models"));
const authRequired = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { token } = req.cookies;
        if (!token) {
            return res.status(403).json({
                error: ["No token, authorization denied"],
            });
        }
        const userDataToken = yield (0, token_libs_1.validateToken)(token);
        const exist = user_models_1.default.findOne({ _id: userDataToken._id });
        if (!exist) {
            res.status(403).json({ error: ["Invalid user"] });
        }
        req.userData = userDataToken;
        next();
        return;
    }
    catch (error) {
        console.error(error);
        return res.status(403).json({
            error: ["Unauthorized - Invalid token"],
        });
    }
});
exports.authRequired = authRequired;
