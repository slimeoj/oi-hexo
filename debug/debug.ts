/** 输出排序后的文章 */
export async function print_sorted_articles(ctx:CTX,next:next_function){
    let {docs} = ctx
    for( let i = 0 ; i<docs.length;i++){
        let doc = docs[i]
        let {update_time,title} = doc.attributes
        console.log(`update_time: ${update_time} | title: ${title}`)
    }
    await next();
}
