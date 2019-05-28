import fs from 'fs'
import {render,gen_pagination} from '../../utils/index'
import {path2url,tag_to_link} from '../../utils/index'

export async function get_article_list(ctx:CTX,next:Function){
    let {db} = ctx

    function _list():Promise<[]>{
        return new Promise( function(res,rej){
            // @ts-ignore
            db.find({}).sort({"attributes.update_time":-1}).exec(function(err,docs){
                if( err)
                    rej(err)
                else
                    res(docs)
            })
        })
    }

    ctx.docs = await _list()
    await next()
}

export async function gen_article_list(ctx:CTX,next:Function){

    let {docs,tag_cloud} = ctx
    /** 生成 */
    let {pagenation,out_dir}  = ctx.config

    /** 多少页面 */
    let count = Math.ceil(docs.length / pagenation)

    if( !tag_cloud)
        tag_cloud = []


    /** 分页 */
    for( let i =0;i< count;i++){
        let list  = docs.slice(i*pagenation,(i+1)*pagenation-1)
        let data = {}
        let post = {
            title:'题解列表'
        }

        /** 生成分页数据 */
        let pagination_template = gen_pagination(count,i+1)
        let pagination  = pagination_template.map( (page)=>{
            if( typeof(page) == 'string')
                return page
            else {
                return {
                    page,
                    url:`/page-${page}.html`,
                    active: i+1 == page
                }
            }

        })
        for( let l of list){
            if(l.attributes.tags)
                l.attributes.tags = 
                    //@ts-ignore
                    l.attributes.tags.map( (tag)=>{
                        return {
                            url:tag_to_link(tag,"",1),
                            name:tag
                        }
                    })

        }
        Object.assign(data,{config:ctx.config},{ tables:list,post , pagination, tag_cloud})
        //console.log(list)
        render('index.ejs',data,`${out_dir}/page-${i+1}.html`)
    }

    if( fs.existsSync(`${out_dir}/page-1.html`)){
        fs.copyFileSync(`${out_dir}/page-1.html`,`${out_dir}/index.html`)
    }



    await next()
}
