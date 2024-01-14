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
exports.verify = exports.profile = exports.logout = exports.login = exports.register = void 0;
const user_models_1 = __importDefault(require("../models/user.models"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const token_libs_1 = require("../libs/token.libs");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, confirmPassword, username, } = req.body;
    if (confirmPassword !== password) {
        return res.status(403).json({
            error: ["The confirm password and the password must match"],
        });
    }
    try {
        const userFound = yield user_models_1.default.findOne({ email });
        if (userFound) {
            return res.status(404).json({ error: ["Email in use"] });
        }
        const passwordHash = yield bcryptjs_1.default.hash(password, 10);
        const newUser = new user_models_1.default({
            username,
            email,
            password: passwordHash,
        });
        const userSave = yield newUser.save();
        const newToken = yield (0, token_libs_1.generateToken)({
            _id: userSave._id,
            username: userSave.username,
            email: userSave.email,
        });
        res.cookie("token", newToken);
        return res.status(201).json({
            user: newUser,
            message: ["User created successfully"],
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: ["Error registering user"] });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const userFound = yield user_models_1.default.findOne({ email });
        if (!userFound) {
            return res.status(404).json({ error: ["Invalid Credentials"] });
        }
        const isMatch = yield bcryptjs_1.default.compare(password, userFound.password);
        if (!isMatch) {
            return res.status(401).json({ error: ["Invalid Credentials"] });
        }
        const newToken = yield (0, token_libs_1.generateToken)({
            _id: userFound._id,
            username: userFound.username,
            email: userFound.email,
        });
        res.cookie("token", newToken);
        return res.status(200).json({
            user: {
                _id: userFound._id,
                username: userFound.username,
                email: userFound.email,
            },
            message: ["User login successfuly"],
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: ["Error al registrar al usuario"] });
    }
});
exports.login = login;
const logout = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.cookie("token", "", {
        expires: new Date(0),
    });
    return res.sendStatus(200);
});
exports.logout = logout;
const profile = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).json(Object.assign({ message: ["user authorized"] }, _req.userData));
});
exports.profile = profile;
const verify = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { token } = req.cookies;
    if (!token)
        return res.status(403).json({ message: ["user unauthorized"] });
    const userDataToken = yield (0, token_libs_1.validateToken)(token);
    const exist = user_models_1.default.findOne({ _id: userDataToken._id });
    if (!exist) {
        res.status(403).json({ error: ["Invalid user"] });
    }
    return res.status(200).json(Object.assign({ message: ["user authorized"] }, userDataToken));
});
exports.verify = verify;
