"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const parse_1 = __importDefault(require("../parse"));
const index_1 = require("../../utils/index");
var md = require("rmarked/forNode.js");
const fs_1 = __importDefault(require("fs"));
/** 生成about */
async function about(ctx, next) {
    let { out_dir } = ctx.config;
    let { base_path: path, opts } = ctx;
    if (fs_1.default.existsSync(`${path}/readme.md`)) {
        let doc = await parse_1.default(`${path}/readme.md`);
        doc.body = md.render.call(md, doc.body);
        let data = {};
        Object.assign(data, { post: doc }, { config: ctx.config });
        index_1.render('article.ejs', data, `${out_dir}/about.html`);
    }
    console.log(" about 页面生成完毕!");
    await next();
}
exports.default = about;
