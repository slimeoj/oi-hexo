/** 过滤,得到文章的列表 */
import * as fs from 'fs'
import * as pfn from 'path'

import {file_name_filter} from '../utils'

export async function article_list(ctx:CTX,next:Function) {
    let def_include = [/\.md$/i]
    let def_exclude = [/^_/,/^\./,/^readme.md$/i]

    let {base_path:path,opts} = ctx

    if( opts.exclude)
        def_include.concat(opts.exclude)

    if( opts.include)
        def_include.concat(opts.include)

    var Fliter  = new file_name_filter(def_include,def_exclude)

    function load_files(p:string):any[]{
        let _list = fs.readdirSync(p)
        let res:any[] = []

        for(let _l of _list){
            let _p = pfn.join(p,_l)
            let stat = fs.statSync(_p)
            if( stat.isDirectory() && !Fliter.is_exclude(_l)){
                res = res.concat( load_files(_p) )
            }
            else if(stat.isFile()){
                if( Fliter.is_ok(_l)){
                    res.push({
                        path:pfn.relative(path,_p),
                        name:_l
                    })
                }
            }
        }

        return res
    }
    ctx.list = load_files(path)
    await next()
}
