/** 删除输出文件夹 */
import del from 'del'
export default async function empty_out_dir(ctx:CTX,next:next_function){
    let {out_dir}  = ctx.config
    del.sync(out_dir)
    console.log(`删除:${out_dir}`)
    await next()
}
