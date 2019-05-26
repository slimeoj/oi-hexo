/** 存数据到数据库 */

import nedb from 'nedb'
import parse from './parse'
import pfn from 'path'
import {path2url} from '../utils'


var db = new nedb()

function insert(doc:any_obj){
    return new Promise( function(res,rej){
        db.insert(doc,function(err,newdoc){
            if( err)
                rej(err)
            else
                res()
        })
    })
}

export default async function store(ctx:CTX,next:Function){
    let {list} = ctx
    for( let l of list){
        let o = await parse( pfn.join(ctx.base_path,l.path))
        //console.log("======================")
        //console.log(o)
        //console.log("======================")
        await insert( Object.assign({},o,l,{url: path2url(l.path)}))
    }
    ctx.db = db
    await next()
}
