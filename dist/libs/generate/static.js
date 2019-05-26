"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/** 复制静态资源 */
const path_1 = __importDefault(require("path"));
var copydir = require("copy-dir");
async function copy_static(ctx, next) {
    var source = path_1.default.join(__dirname, '../../../views/static');
    console.log(source);
    copydir.sync(source, path_1.default.join(ctx.config.out_dir, 'static'), {
        utimes: false,
        mode: false,
        cover: true,
    });
    await next();
}
exports.default = copy_static;
