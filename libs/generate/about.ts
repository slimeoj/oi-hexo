import parse from '../parse'
import {render} from '../../utils/index'
var md = require("rmarked/forNode.js")
import fs from 'fs'
/** 生成about */
export default async function about(ctx:CTX,next:Function){

    let {out_dir}  = ctx.config
    let {base_path:path,opts} = ctx
    if( fs.existsSync(`${path}/readme.md`)){
        let doc = await parse(`${path}/readme.md`)
        doc.body = md.render.call(md,doc.body)
        let data = {}
        Object.assign(data,{post:doc},{config:ctx.config})
        render('article.ejs',data,`${out_dir}/about.html`)
    }
    console.log(" about 页面生成完毕!")
    await next()
}
