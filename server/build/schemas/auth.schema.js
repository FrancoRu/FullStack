"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = exports.registerSchema = void 0;
const zod_1 = require("zod");
exports.registerSchema = zod_1.z.object({
    username: zod_1.z.string({ required_error: 'username is required' }).min(8, {
        message: 'Username must be at least 8 characters'
    }),
    email: zod_1.z
        .string({ required_error: 'email is required' })
        .email({ message: 'Invalid email' }),
    password: zod_1.z
        .string({
        required_error: 'Password is required'
    })
        .min(6, {
        message: 'Password must be at least 6 characters'
    }),
    confirmPassword: zod_1.z
        .string({
        required_error: 'Password is required'
    })
        .min(6, {
        message: 'Password must be at least 6 characters'
    })
});
exports.loginSchema = zod_1.z.object({
    email: zod_1.z
        .string({ required_error: 'email is required' })
        .email({ message: 'Invalid email' }),
    password: zod_1.z
        .string({
        required_error: 'Password is required'
    })
        .min(6, {
        message: 'Password must be at least 6 characters'
    })
});