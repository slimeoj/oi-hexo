"use strict";
/** 存数据到数据库 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nedb_1 = __importDefault(require("nedb"));
const parse_1 = __importDefault(require("./parse"));
const path_1 = __importDefault(require("path"));
const utils_1 = require("../utils");
var db = new nedb_1.default();
function insert(doc) {
    return new Promise(function (res, rej) {
        db.insert(doc, function (err, newdoc) {
            if (err)
                rej(err);
            else
                res();
        });
    });
}
async function store(ctx, next) {
    let { list } = ctx;
    for (let l of list) {
        let o = await parse_1.default(path_1.default.join(ctx.base_path, l.path));
        //console.log("======================")
        //console.log(o)
        //console.log("======================")
        await insert(Object.assign({}, o, l, { url: utils_1.path2url(l.path) }));
    }
    ctx.db = db;
    await next();
}
exports.default = store;
