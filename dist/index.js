"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const compose_1 = __importDefault(require("./libs/compose"));
const list_1 = require("./libs/list");
const store_1 = __importDefault(require("./libs/store"));
const utils_1 = require("./utils");
const static_1 = __importDefault(require("./libs/generate/static"));
const empty_dir_1 = __importDefault(require("./libs/empty_dir"));
const tag_1 = require("./libs/generate/tag");
/** generate */
const artilce_list_1 = require("./libs/generate/artilce_list");
const artilce_1 = __importDefault(require("./libs/generate/artilce"));
const about_1 = __importDefault(require("./libs/generate/about"));
/** _debug +++++++ */
const debug_1 = require("./debug/debug");
/** _debug end +++++++ */
var C = new compose_1.default();
function _debug(ctx) {
    console.log("========= end =========");
}
/** 读取配置 */
C.add_mw(utils_1.load_config);
/** 从硬盘中读取所有的符合条件的文件 */
C.add_mw(list_1.article_list);
/** 存入 */
C.add_mw(store_1.default);
/** 取出 */
C.add_mw(artilce_list_1.get_article_list);
/** debug */
C.add_mw(debug_1.print_sorted_articles);
/** 得到tag_cloud */
C.add_mw(tag_1.get_tag_cloud);
C.add_mw(empty_dir_1.default);
/** 生成文章列表 */
C.add_mw(artilce_list_1.gen_article_list);
/** 生成tag 列表*/
C.add_mw(tag_1.get_tag_cloud_list);
/** 生成文章 */
C.add_mw(artilce_1.default);
/** 生成about */
C.add_mw(about_1.default);
C.add_mw(static_1.default);
C.add_mw(_debug);
async function main(base_path) {
    /** 加载配置 */
    await C.run({
        base_path: base_path ? base_path : process.cwd(),
        opts: {},
        list: []
    });
}
exports.default = main;
