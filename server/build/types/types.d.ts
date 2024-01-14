/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import mongoose from 'mongoose';
export type UserToken = {
    _id: mongoose.Schema.Types.ObjectId;
    username: string;
    email: string;
};
export declare enum Importance {
    Low = "Low",
    Medium = "Medium",
    High = "High"
}
export declare enum State {
    WithoutStarting = "Without Starting",
    Developing = "Developing",
    Finished = "Finished"
}
export interface tasks {
    project: mongoose.Schema.Types.ObjectId;
    user: mongoose.Schema.Types.ObjectId;
    createdBy: string;
    title: string;
    description?: string;
    deadline: Date;
    importance: Importance;
}
export interface saveTasks extends tasks {
    state: State;
}
export interface project {
    nameproject: string;
    createdBy: string;
    user: mongoose.Schema.Types.ObjectId;
    description?: string;
    deadline: Date;
    importance: Importance;
}
export interface saveproject extends project {
    state: State;
}
//# sourceMappingURL=types.d.ts.map