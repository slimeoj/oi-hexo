var util = require("./utils")
var debug = console.log

var comp = new util.compose()

comp.add_mw(util.article_list)

comp.run({
    path:'/home/rainboy/mycode/bookData',
    opts:{}
}).then( (ctx)=>{
    console.log(ctx)
})
