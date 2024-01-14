"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTaskSchema = exports.getTasksSchema = exports.createTaskSchema = void 0;
const zod_1 = require("zod");
const types_1 = require("../types/types");
exports.createTaskSchema = zod_1.z.object({
    project: zod_1.z.string(),
    // .refine(
    //   (value) => {
    //     try {
    //       mongoose.Types.ObjectId.createFromHexString(value)
    //       return true
    //     } catch (error) {
    //       return false
    //     }
    //   },
    //   {
    //     message: 'Must be a valid ObjectId'
    //   })
    title: zod_1.z
        .string({
        required_error: 'Title is required'
    })
        .min(1),
    description: zod_1.z.string().optional(),
    deadline: zod_1.z.string().refine((value) => {
        const parsedDate = new Date(value);
        return !isNaN(parsedDate.getTime()); // Verifica si es una fecha válida
    }, {
        message: 'Debe ser una cadena de fecha válida'
    }),
    importance: zod_1.z.nativeEnum(types_1.Importance, {
        required_error: 'Importance is required'
    })
});
exports.getTasksSchema = zod_1.z.object({
    project: zod_1.z.string()
});
exports.updateTaskSchema = zod_1.z.object({
    project: zod_1.z.string(),
    title: zod_1.z
        .string({
        required_error: 'Title is required'
    })
        .nullable(),
    description: zod_1.z.string().nullable(),
    deadline: zod_1.z
        .string()
        .refine((value) => {
        const parsedDate = new Date(value);
        return !isNaN(parsedDate.getTime()); // Verifica si es una fecha válida
    }, {
        message: 'Debe ser una cadena de fecha válida'
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
