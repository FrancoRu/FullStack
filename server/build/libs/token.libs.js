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
exports.validateToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateToken = (userSave) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tokenExpiration = '1d';
        const tokenPayload = Object.assign({}, userSave);
        const token = yield jsonwebtoken_1.default.sign(tokenPayload, `${process.env.SECRETKEY}`, {
            expiresIn: tokenExpiration
        });
        return token;
    }
    catch (error) {
        throw new Error(`Error al generar el token: ${error.message}`);
    }
});
exports.generateToken = generateToken;
const validateToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        jsonwebtoken_1.default.verify(token, process.env.SECRETKEY || '', (err, user) => {
            if (err) {
                reject(new Error('Invalid token'));
            }
            else {
                resolve(user);
            }
        });
    });
});
exports.validateToken = validateToken;
