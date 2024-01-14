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
exports.updateTask = exports.deleteTask = exports.getTask = exports.createTask = exports.getTasks = void 0;
const task_models_1 = __importDefault(require("../models/task.models"));
const types_1 = require("../types/types");
const project_model_1 = __importDefault(require("../models/project.model"));
const getTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const { project } = req.body
    var _a;
    const userId = (_a = req.userData) === null || _a === void 0 ? void 0 : _a._id;
    if (!userId) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const tasks = yield task_models_1.default.find({
        // project: project,
        user: userId
    });
    return res
        .status(200)
        .json({ data: tasks, message: 'Tasks searching succesfully' });
});
exports.getTasks = getTasks;
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b, _c;
    const { project, title, description, deadline, importance } = req.body;
    if (Object.values(types_1.Importance).includes(importance)) {
        try {
            const existingTitle = yield task_models_1.default.findOne({
                project: project,
                title: title
            });
            const Project = yield project_model_1.default.findById(project);
            if (existingTitle) {
                return res.status(409).json({
                    message: `The title '${title}' already exists for in the project name '${Project === null || Project === void 0 ? void 0 : Project.nameproject}'`
                });
            }
            // developsTask(project)
            (Project === null || Project === void 0 ? void 0 : Project.state) === types_1.State.Finished &&
                updateProjectById(Project._id, types_1.State.Developing);
            const userId = (_b = req.userData) === null || _b === void 0 ? void 0 : _b._id;
            const username = (_c = req.userData) === null || _c === void 0 ? void 0 : _c.username;
            if (!username || !userId) {
                return res.status(401).json({ message: 'Unauthorized' });
            }
            const newTask = new task_models_1.default({
                project,
                createdBy: username,
                user: userId,
                title,
                description,
                deadline,
                importance,
                state: types_1.State.WithoutStarting
            });
            const savedTask = yield newTask.save();
            return res.status(200).json({
                data: savedTask,
                message: ['Task created']
            });
        }
        catch (error) {
            return res
                .status(500)
                .json({ message: 'Error to save task', error: error.message });
        }
    }
    else {
        return res.status(400).json({ message: 'Importance not valid' });
    }
});
exports.createTask = createTask;
const getTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    const taskId = req.params.id;
    try {
        const userId = (_d = req.userData) === null || _d === void 0 ? void 0 : _d._id;
        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const task = yield task_models_1.default.findOne({
            _id: taskId,
            user: userId
        });
        if (!task) {
            return res.status(404).json({ message: 'task not found' });
        }
        return res.json(task);
    }
    catch (error) {
        return res
            .status(500)
            .json({ message: 'Error to get tasks', error: error.message });
    }
});
exports.getTask = getTask;
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _e;
    const taskId = req.params.id;
    const userId = (_e = req.userData) === null || _e === void 0 ? void 0 : _e._id;
    if (!taskId || !userId) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
        const task = yield task_models_1.default.findByIdAndDelete({
            _id: taskId,
            user: userId
        });
        if (!task) {
            return res.status(404).json({ message: 'task not found' });
        }
        return res.status(204).json({ message: 'task successfully deleted' });
    }
    catch (error) {
        return res
            .status(500)
            .json({ message: 'Error to get tasks', error: error.message });
    }
});
exports.deleteTask = deleteTask;
const updateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _f;
    const taskId = req.params.id;
    const userId = (_f = req.userData) === null || _f === void 0 ? void 0 : _f._id;
    if (!taskId || !userId) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
        const task = yield task_models_1.default.findOneAndUpdate({ _id: taskId, user: userId }, req.body, {
            new: true
        });
        req.body.state === types_1.State.Finished
            ? finishedTask(req.body.project)
            : updateProjectById(req.body.project, types_1.State.Developing);
        if (!task) {
            return res.status(404).json({ message: 'task not found' });
        }
        return res.status(200).json({
            data: task,
            message: ['Successfully modified tasks']
        });
    }
    catch (error) {
        return res
            .status(500)
            .json({ message: 'Error to get tasks', error: error.message });
    }
});
exports.updateTask = updateTask;
const finishedTask = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const tasks = yield task_models_1.default.find({ project: id });
    const allTasksFinished = tasks.every((task) => task.state === types_1.State.Finished);
    allTasksFinished && updateProjectById(id, types_1.State.Finished);
});
// const developsTask = async (id: string): Promise<void> => {
//   const tasks = await TasksModel.find({ project: id })
//   const taskDev = tasks.some((task) => task.state === State.Developing)
//   taskDev && updateProjectById(id, State.Developing)
// }
const updateProjectById = (id, stateUpdate) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Buscar el proyecto por su _id
        const project = yield project_model_1.default.findById(id);
        // Verificar si el proyecto existe
        if (!project) {
            throw new Error('Proyecto no encontrado');
        }
        project.state = stateUpdate;
        yield project.save();
    }
    catch (error) {
        console.error('Error al actualizar el proyecto:', error.message);
        throw error; // Puedes manejar el error de la forma que desees
    }
});
