"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/** 常用工具函数 */
const fs = __importStar(require("fs"));
const pfn = __importStar(require("path"));
const js_yaml_1 = require("js-yaml");
const mkdirp_1 = __importDefault(require("mkdirp"));
const ejs_1 = __importDefault(require("ejs"));
var md5 = require("md5");
/** 文件名过滤 */
class file_name_filter {
    constructor(includes, excludes) {
        this.include_regx = includes;
        this.exclude_regx = excludes;
    }
    /** 是否ok */
    is_ok(name) {
        for (let reg of this.include_regx)
            if (!reg.test(name))
                return false;
        for (let reg of this.exclude_regx)
            if (reg.test(name))
                return false;
        return true;
    }
    /** 是否是过滤文件 */
    is_exclude(name) {
        for (let reg of this.exclude_regx) {
            if (reg.test(name))
                return true;
        }
        return false;
    }
}
exports.file_name_filter = file_name_filter;
const render_cache = {};
const view_path = pfn.join(__dirname, '../../views');
/** 渲染 */
function render(view_name, data, out_path) {
    let _p = pfn.dirname(out_path);
    mkdirp_1.default.sync(_p);
    if (!render_cache[view_name]) {
        let view = pfn.join(view_path, view_name);
        if (!fs.existsSync(view)) {
            throw (`${view} not exists!`);
        }
        render_cache[view_name] = ejs_1.default.compile(fs.readFileSync(view, { encoding: 'utf-8' }), { filename: view });
    }
    fs.writeFileSync(out_path, render_cache[view_name](data));
}
exports.render = render;
/** 路径转url */
function path2url(path) {
    return `article/${md5(path)}.html`;
}
exports.path2url = path2url;
/** 读取配置 */
async function load_config(ctx, next) {
    let { base_path } = ctx;
    let config_str = fs.readFileSync(pfn.join(base_path, '_config.yml'), { encoding: 'utf-8' });
    ctx.config = js_yaml_1.load(config_str);
    await next();
}
exports.load_config = load_config;
/** 生成分页的template数据 */
function gen_pagination(count, now) {
    var page = [now];
    if (now == 1) {
        for (let i = 2; i <= 6 && i <= count; i++)
            page.push(i);
    }
    else if (now == count) {
        for (let i = count - 1; i >= count - 6 && i >= 1; i--)
            page.unshift(i);
    }
    else {
        var left_count = 2;
        let idx = now - 1;
        while (left_count > 0 && idx > 1) {
            page.unshift(idx);
            idx--;
            left_count--;
        }
        var right_count = left_count + 2;
        idx = now + 1;
        while (right_count > 0 && idx < count) {
            page.push(idx);
            idx++;
            right_count--;
        }
        idx = page[0] - 1;
        while (right_count > 0 && idx > 1) {
            page.unshift(idx);
            idx--;
            right_count--;
        }
    }
    if (page[0] == 2)
        page.unshift(1);
    else if (page[0] > 2)
        page.unshift(1, '...');
    let len = page.length;
    if (page[len - 1] == count - 1)
        page.push(count);
    else if (page[len - 1] < count - 1)
        page.push('...', count);
    return page;
}
exports.gen_pagination = gen_pagination;
function tag_to_link(name, prefix, idx) {
    return `${prefix}tags/${name}/${idx}.html`;
}
exports.tag_to_link = tag_to_link;
