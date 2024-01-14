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
exports.updateproject = exports.deleteproject = exports.getproject = exports.createproject = exports.getprojects = void 0;
const project_model_1 = __importDefault(require("../models/project.model"));
const types_1 = require("../types/types");
const task_models_1 = __importDefault(require("../models/task.models"));
const getprojects = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.userData) === null || _a === void 0 ? void 0 : _a._id;
    if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const project = yield project_model_1.default.find({
        user: userId,
    });
    return res
        .status(200)
        .json({ data: project, message: "Projects searching succesfully" });
});
exports.getprojects = getprojects;
const createproject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b, _c;
    const { nameproject, description, deadline, importance } = req.body;
    if (Object.values(types_1.Importance).includes(importance)) {
        try {
            const userId = (_b = req.userData) === null || _b === void 0 ? void 0 : _b._id;
            const username = (_c = req.userData) === null || _c === void 0 ? void 0 : _c.username;
            if (!username || !userId) {
                return res.status(401).json({ message: "Unauthorized" });
            }
            const newproject = new project_model_1.default({
                nameproject,
                createdBy: username,
                user: userId,
                description,
                deadline,
                importance,
                state: types_1.State.WithoutStarting,
            });
            const saveproject = yield newproject.save();
            return res.status(200).json({
                data: saveproject,
                message: ["Project created"],
            });
        }
        catch (error) {
            return res
                .status(500)
                .json({ message: "Error to save project", error: error.message });
        }
    }
    else {
        return res.status(400).json({ message: "Importance not valid" });
    }
});
exports.createproject = createproject;
const getproject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    const projectId = req.params.id;
    try {
        const userId = (_d = req.userData) === null || _d === void 0 ? void 0 : _d._id;
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const project = yield project_model_1.default.findOne({
            _id: projectId,
            user: userId,
        });
        if (!project) {
            return res.status(404).json({ message: "project not found" });
        }
        return res.json(project);
    }
    catch (error) {
        return res
            .status(500)
            .json({ message: "Error to get project", error: error.message });
    }
});
exports.getproject = getproject;
const deleteproject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _e;
    const projectId = req.params.id;
    const userId = (_e = req.userData) === null || _e === void 0 ? void 0 : _e._id;
    if (!projectId || !userId) {
        return res.status(401).json({ message: ["Unauthorized"] });
    }
    try {
        yield task_models_1.default.deleteMany({
            project: projectId,
        });
        const project = yield project_model_1.default.findByIdAndDelete({
            _id: projectId,
            user: userId,
        });
        if (!project) {
            return res.status(404).json({ message: ["project not found"] });
        }
        return res.status(204).json({ message: ["project successfully deleted"] });
    }
    catch (error) {
        return res
            .status(500)
            .json({ message: ["Error to get project"], error: error.message });
    }
});
exports.deleteproject = deleteproject;
const updateproject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _f;
    const projectId = req.params.id;
    const userId = (_f = req.userData) === null || _f === void 0 ? void 0 : _f._id;
    if (!projectId || !userId) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {
        const project = yield project_model_1.default.findOneAndUpdate({ _id: projectId, user: userId }, req.body, {
            new: true,
        });
        if (!project) {
            return res.status(404).json({ message: "project not found" });
        }
        return res.status(200).json({
            data: project,
            message: ["Successfully modified project"],
        });
    }
    catch (error) {
        return res
            .status(500)
            .json({ message: "Error to get project", error: error.message });
    }
});
exports.updateproject = updateproject;
