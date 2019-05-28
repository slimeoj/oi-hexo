"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** 输出排序后的文章 */
async function print_sorted_articles(ctx, next) {
    let { docs } = ctx;
    for (let i = 0; i < docs.length; i++) {
        let doc = docs[i];
        let { update_time, title } = doc.attributes;
        console.log(`update_time: ${update_time} | title: ${title}`);
    }
    await next();
}
exports.print_sorted_articles = print_sorted_articles;
