"use strict";
/**
 * 标签相关
 * */
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils");
const index_1 = require("../../utils/index");
/** 得到标签云 */
async function get_tag_cloud(ctx, next) {
    let set = new Set();
    let { docs } = ctx;
    //@ts-ignore
    docs.forEach(({ attributes }) => {
        let { tags = [] } = attributes;
        //@ts-ignore
        tags.forEach(tag => set.add(tag));
    });
    ctx.tag_cloud = Array.from(set).map(tag => {
        return {
            url: utils_1.tag_to_link(tag, "", 1),
            name: tag
        };
    });
    await next();
}
exports.get_tag_cloud = get_tag_cloud;
/** 生成tag的列表 */
async function get_tag_cloud_list(ctx, next) {
    let { tag_cloud, db } = ctx;
    let { pagenation, out_dir } = ctx.config;
    function find(tag) {
        return new Promise((res, rej) => {
            //@ts-ignore
            db.find({ "attributes.tags": { $elemMatch: tag } }, function (err, docs) {
                if (err)
                    rej(err);
                else
                    res(docs);
            });
        });
    }
    for (let tag of tag_cloud) {
        //console.log(tag.name)
        let docs = await find(tag.name);
        let post = { title: `标签:${tag.name}` };
        /** 多少页面 */
        let count = Math.ceil(docs.length / pagenation);
        for (let i = 0; i < count; i++) {
            let list = docs.slice(i * pagenation, (i + 1) * pagenation - 1);
            let pagination_template = index_1.gen_pagination(count, i + 1);
            let pagination = pagination_template.map((page) => {
                if (typeof (page) == 'string')
                    return page;
                else {
                    return {
                        page,
                        url: utils_1.tag_to_link(tag.name, "", page),
                        active: i + 1 == page
                    };
                }
            });
            let data = {};
            Object.assign(data, { config: ctx.config }, { tables: list, post, pagination, tag_cloud });
            index_1.render('index.ejs', data, utils_1.tag_to_link(tag.name, out_dir, i + 1));
        }
    }
    await next();
}
exports.get_tag_cloud_list = get_tag_cloud_list;
