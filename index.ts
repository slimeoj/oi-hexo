import compose from './libs/compose'
import {article_list} from './libs/list'
import store from './libs/store'
import {load_config} from './utils'

import copy_static from './libs/generate/static'
import empty_out_dir from './libs/empty_dir'

import {get_tag_cloud,get_tag_cloud_list} from './libs/generate/tag'

/** generate */
import {get_article_list,gen_article_list}from './libs/generate/artilce_list'
import g_artilce from './libs/generate/artilce'

import about from './libs/generate/about'


/** _debug +++++++ */

import {print_sorted_articles} from './debug/debug'
/** _debug end +++++++ */

var C = new compose()



function _debug(ctx:CTX){
    console.log("========= end =========")
}

/** 读取配置 */
C.add_mw(load_config)

/** 从硬盘中读取所有的符合条件的文件 */
C.add_mw(article_list)
/** 存入 */
C.add_mw(store)

/** 取出 */
C.add_mw(get_article_list)

/** debug */
C.add_mw(print_sorted_articles)

/** 得到tag_cloud */
C.add_mw(get_tag_cloud)

C.add_mw(empty_out_dir)

/** 生成文章列表 */
C.add_mw(gen_article_list)

/** 生成tag 列表*/
C.add_mw(get_tag_cloud_list)

/** 生成文章 */
C.add_mw(g_artilce)

/** 生成about */
C.add_mw(about)

C.add_mw(copy_static)

C.add_mw(_debug)

export default async function main(base_path:string ){

    /** 加载配置 */


    await C.run({
        base_path: base_path ? base_path : process.cwd(),
        opts:{},
        list:[]
    })

}

