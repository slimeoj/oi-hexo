/** 复制静态资源 */
import pfn from 'path'
var copydir = require("copy-dir")
export default async function copy_static(ctx:CTX,next:next_function){
    var source = pfn.join(__dirname,'../../../views/static')
    console.log(source)
    copydir.sync(source,pfn.join(ctx.config.out_dir,'static'),{
        utimes: false,  // Boolean | Object, keep addTime or modifyTime if true
        mode: false,    // Boolean | Number, keep file mode if true
        cover: true,    // Boolean, cover if file exists
    })
    await next()
}

