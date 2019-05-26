/** 常用工具函数 */
import * as fs from 'fs'
import * as pfn from 'path'
import {load} from 'js-yaml'
import mkdirp from 'mkdirp'
import ejs from 'ejs'
var md5 = require("md5")

/** 文件名过滤 */
export class file_name_filter {

    private include_regx: RegExp[]
    private exclude_regx: RegExp[]

    constructor(includes: RegExp[], excludes: RegExp[]) {
        this.include_regx = includes
        this.exclude_regx = excludes
    }

    /** 是否ok */
    is_ok(name: string) {
        for (let reg of this.include_regx)
            if (!reg.test(name))
                return false

        for (let reg of this.exclude_regx)
            if (reg.test(name))
                return false

        return true
    }
    /** 是否是过滤文件 */
    is_exclude(name:string){
        for( let reg of this.exclude_regx){
            if (reg.test(name))
                return true
        }
        return false
    }
}


const render_cache:any_obj = {}
const view_path = pfn.join(__dirname,'../../views')

/** 渲染 */
export function render(view_name:string,data:any_obj,out_path:string){
    let _p = pfn.dirname(out_path)
    mkdirp.sync(_p)

    if(!render_cache[view_name]){

        let view = pfn.join(view_path,view_name)
        if( !fs.existsSync(view)){
            throw(`${view} not exists!`)
        }
        render_cache[view_name]= ejs.compile(
            fs.readFileSync(view,{encoding:'utf-8'}),{filename:view}
        )
    }

    fs.writeFileSync(out_path,render_cache[view_name](data))
}

/** 路径转url */
export function path2url(path:string){
    return `article/${md5(path)}.html`
}

/** 读取配置 */
export async function load_config(ctx:CTX,next:next_function) {
    let {base_path} = ctx

    let config_str = fs.readFileSync(pfn.join(base_path,'_config.yml'),{encoding:'utf-8'})
    ctx.config = load(config_str)

    await next()

}

/** 生成分页的template数据 */
export function gen_pagination(count:number,now:number){


    type num_str = number |string
    var page:num_str[]= [now]

    if( now == 1) {
        for(let i =2;i<= 6 && i <= count;i++)
            page.push(i)
    }
    else if( now == count){
        for( let i=count-1;i>=count-6 && i>=1 ;i--)
            page.unshift(i)
    }
    else {
        var left_count = 2
        let idx = now-1
        while( left_count >0 && idx >1){
            page.unshift(idx);
            idx--;
            left_count--;
        }

        var right_count = left_count+2;
        idx = now+1
        while(right_count > 0 && idx < count){
            page.push(idx);
            idx++;
            right_count--;
        }

        idx = <number>page[0]-1;
        while(right_count >0 && idx >1){
            page.unshift(idx);
            idx--;
            right_count--;
        }
    }

    if( page[0] == 2)
        page.unshift(1)
    else if(page[0] > 2)
        page.unshift(1,'...')

    let len = page.length
    if( page[len-1] == count-1)
        page.push(count)
    else if( page[len-1] < count-1)
        page.push('...',count)

    return page
}

export function tag_to_link(name:string,prefix:string,idx:number){
    return `${prefix}tags/${name}/${idx}.html`
}
