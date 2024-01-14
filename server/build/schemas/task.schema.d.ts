import { z } from 'zod';
import { Importance, State } from '../types/types';
export declare const createTaskSchema: z.ZodObject<{
    project: z.ZodString;
    title: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    deadline: z.ZodEffects<z.ZodString, string, string>;
    importance: z.ZodNativeEnum<typeof Importance>;
}, "strip", z.ZodTypeAny, {
    project: string;
    title: string;
    deadline: string;
    importance: Importance;
    description?: string | undefined;
}, {
    project: string;
    title: string;
    deadline: string;
    importance: Importance;
    description?: string | undefined;
}>;
export declare const getTasksSchema: z.ZodObject<{
    project: z.ZodString;
}, "strip", z.ZodTypeAny, {
    project: string;
}, {
    project: string;
}>;
export declare const updateTaskSchema: z.ZodObject<{
    project: z.ZodString;
    title: z.ZodNullable<z.ZodString>;
    description: z.ZodNullable<z.ZodString>;
    deadline: z.ZodNullable<z.ZodEffects<z.ZodString, string, string>>;
    importance: z.ZodNullable<z.ZodNativeEnum<typeof Importance>>;
    state: z.ZodNullable<z.ZodNativeEnum<typeof State>>;
}, "strip", z.ZodTypeAny, {
    state: State | null;
    project: string;
    title: string | null;
    description: string | null;
    deadline: string | null;
    importance: Importance | null;
}, {
    state: State | null;
    project: string;
    title: string | null;
    description: string | null;
    deadline: string | null;
    importance: Importance | null;
}>;
//# sourceMappingURL=task.schema.d.ts.map