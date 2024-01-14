"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.State = exports.Importance = void 0;
var Importance;
(function (Importance) {
    Importance["Low"] = "Low";
    Importance["Medium"] = "Medium";
    Importance["High"] = "High";
})(Importance || (exports.Importance = Importance = {}));
var State;
(function (State) {
    State["WithoutStarting"] = "Without Starting";
    State["Developing"] = "Developing";
    State["Finished"] = "Finished";
})(State || (exports.State = State = {}));
