var ejs = require("ejs")
const fs = require("fs")

var str = fs.readFileSync("./views/index.ejs",{encoding:'utf-8'})

ejs.compile(str,{
    filename:'views/index.ejs'
})
