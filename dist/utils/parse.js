"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const front_matter_1 = __importDefault(require("front-matter"));
const moment_1 = __importDefault(require("moment"));
const parse = (content) => {
    let { attributes, body } = front_matter_1.default(content);
    if (attributes.create_time) {
        attributes.create_time = moment_1.default(attributes.create_time).unix();
    }
    if (attributes.update_time) {
        attributes.update_time = moment_1.default(attributes.update_time).unix();
    }
    return {
        attributes,
        body
    };
};
exports.default = parse;
