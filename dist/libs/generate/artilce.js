"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var md = require("rmarked/forNode.js");
const index_1 = require("../../utils/index");
const index_2 = require("../../utils/index");
/** 生成文件 */
async function article(ctx, next) {
    let { db } = ctx;
    let { out_dir } = ctx.config;
    let { docs } = ctx;
    /** 生成 */
    for (let doc of docs) {
        let data = {};
        doc.body = md.render.call(md, doc.body);
        //if(doc.attributes.tags)
        //doc.attributes.tags = 
        ////@ts-ignore
        //doc.attributes.tags.map( (tag)=>{
        //return {
        //url:tag_to_link(tag,"",1),
        //name:tag
        //}
        //})
        Object.assign(data, { post: doc }, { config: ctx.config });
        index_1.render('article.ejs', data, `${out_dir}/${index_2.path2url(doc.path)}`);
    }
    await next();
}
exports.default = article;
