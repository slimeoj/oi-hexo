var md = require("rmarked/forNode.js")
import {render} from '../../utils/index'
import {path2url,tag_to_link} from '../../utils/index'
/** 生成文件 */
export default async function article(ctx:CTX,next:Function){
    let {db} = ctx


    let {out_dir}  = ctx.config
    let {docs }= ctx

    /** 生成 */
    for( let doc of docs){
        let data = {}
        doc.body = md.render.call(md,doc.body)
        //if(doc.attributes.tags)
            //doc.attributes.tags = 
                ////@ts-ignore
                //doc.attributes.tags.map( (tag)=>{
                    //return {
                        //url:tag_to_link(tag,"",1),
                        //name:tag
                    //}
                //})
        Object.assign(data,{post:doc},{config:ctx.config})
        render('article.ejs',data,`${out_dir}/${path2url(doc.path)}`)
    }

    await next()
}
