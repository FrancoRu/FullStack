"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.objectIdSchema = void 0;
const zod_1 = require("zod");
const mongoose_1 = __importDefault(require("mongoose"));
exports.objectIdSchema = zod_1.z.string().refine((value) => {
    try {
        mongoose_1.default.Types.ObjectId.createFromHexString(value);
        return true;
    }
    catch (error) {
        return false;
    }
}, {
    message: 'Must be a valid ObjectId'
});
