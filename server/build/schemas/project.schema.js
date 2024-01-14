"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateprojectSchema = exports.createprojectSchema = void 0;
const zod_1 = require("zod");
const types_1 = require("../types/types");
exports.createprojectSchema = zod_1.z.object({
    nameproject: zod_1.z
        .string({
        required_error: 'project is required'
    })
        .min(1),
    description: zod_1.z.string(),
    deadline: zod_1.z.string().refine((value) => {
        const parsedDate = new Date(value);
        return !isNaN(parsedDate.getTime()); // Verifica si es una fecha válida
    }, {
        message: 'Must be a valid date string'
    }),
    importance: zod_1.z.nativeEnum(types_1.Importance, {
        required_error: 'Importance is required'
    })
});
exports.updateprojectSchema = zod_1.z.object({
    nameproject: zod_1.z
        .string({
        required_error: 'project is required'
    })
        .nullable(),
    description: zod_1.z.string().nullable(),
    deadline: zod_1.z
        .string()
        .refine((value) => {
        const parsedDate = new Date(value);
        return !isNaN(parsedDate.getTime()); // Verifica si es una fecha válida
    }, {
        message: 'Must be a valid date string'
    })
        .nullable(),
    importance: zod_1.z
        .nativeEnum(types_1.Importance, {
        required_error: 'Importance is required'
    })
        .nullable(),
    state: zod_1.z
        .nativeEnum(types_1.State, {
        required_error: 'State is required'
    })
        .nullable()
});
