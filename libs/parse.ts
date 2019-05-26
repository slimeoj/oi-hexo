/**
 * 解析文章
 *   - 文章头
 *   - 文章体
 * */
import * as fs from 'fs'
import fm  from 'front-matter'
import moment from 'moment'
import ejs from 'ejs'

function readFile(path:string):Promise<string>{
    return new Promise((res,rej)=>{
        ejs.renderFile(path,(err,data)=>{
            if(err)
                rej(err)
            else
                res(data)
        })
    })
}

const parse = async (path:string) => {
    //let content =fs.readFileSync(path,{encoding:'utf-8'})
    let content = await readFile(path)
    let {attributes,body}= fm(content)
    if(<front_matter>attributes.create_time){
        attributes.create_time = moment(attributes.create_time).unix();
    }
    if(<front_matter>attributes.update_time){
        attributes.update_time = moment(attributes.update_time).unix();
    }

    return {
        attributes,
        body
    }
}

export default parse
