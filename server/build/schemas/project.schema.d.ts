import { z } from 'zod';
import { Importance, State } from '../types/types';
export declare const createprojectSchema: z.ZodObject<{
    nameproject: z.ZodString;
    description: z.ZodString;
    deadline: z.ZodEffects<z.ZodString, string, string>;
    importance: z.ZodNativeEnum<typeof Importance>;
}, "strip", z.ZodTypeAny, {
    description: string;
    deadline: string;
    importance: Importance;
    nameproject: string;
}, {
    description: string;
    deadline: string;
    importance: Importance;
    nameproject: string;
}>;
export declare const updateprojectSchema: z.ZodObject<{
    nameproject: z.ZodNullable<z.ZodString>;
    description: z.ZodNullable<z.ZodString>;
    deadline: z.ZodNullable<z.ZodEffects<z.ZodString, string, string>>;
    importance: z.ZodNullable<z.ZodNativeEnum<typeof Importance>>;
    state: z.ZodNullable<z.ZodNativeEnum<typeof State>>;
}, "strip", z.ZodTypeAny, {
    state: State | null;
    description: string | null;
    deadline: string | null;
    importance: Importance | null;
    nameproject: string | null;
}, {
    state: State | null;
    description: string | null;
    deadline: string | null;
    importance: Importance | null;
    nameproject: string | null;
}>;
//# sourceMappingURL=project.schema.d.ts.map