"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
/** 过滤,得到文章的列表 */
const fs = __importStar(require("fs"));
const pfn = __importStar(require("path"));
const utils_1 = require("../utils");
async function article_list(ctx, next) {
    let def_include = [/\.md$/i];
    let def_exclude = [/^_/, /^\./, /^readme.md$/i];
    let { base_path: path, opts } = ctx;
    if (opts.exclude)
        def_include.concat(opts.exclude);
    if (opts.include)
        def_include.concat(opts.include);
    var Fliter = new utils_1.file_name_filter(def_include, def_exclude);
    function load_files(p) {
        let _list = fs.readdirSync(p);
        let res = [];
        for (let _l of _list) {
            let _p = pfn.join(p, _l);
            let stat = fs.statSync(_p);
            if (stat.isDirectory() && !Fliter.is_exclude(_l)) {
                res = res.concat(load_files(_p));
            }
            else if (stat.isFile()) {
                if (Fliter.is_ok(_l)) {
                    res.push({
                        path: pfn.relative(path, _p),
                        name: _l
                    });
                }
            }
        }
        return res;
    }
    ctx.list = load_files(path);
    await next();
}
exports.article_list = article_list;
