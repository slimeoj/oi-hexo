"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/** 删除输出文件夹 */
const del_1 = __importDefault(require("del"));
async function empty_out_dir(ctx, next) {
    let { out_dir } = ctx.config;
    del_1.default.sync(out_dir);
    console.log(`删除:${out_dir}`);
    await next();
}
exports.default = empty_out_dir;
