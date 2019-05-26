"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const front_matter_1 = __importDefault(require("front-matter"));
const moment_1 = __importDefault(require("moment"));
const ejs_1 = __importDefault(require("ejs"));
function readFile(path) {
    return new Promise((res, rej) => {
        ejs_1.default.renderFile(path, (err, data) => {
            if (err)
                rej(err);
            else
                res(data);
        });
    });
}
const parse = async (path) => {
    //let content =fs.readFileSync(path,{encoding:'utf-8'})
    let content = await readFile(path);
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
