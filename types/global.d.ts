interface front_matter {
    title:string
    author:string
    create_time: string | Date
    update_time: string | Date
    tags: string[]
    source: {
        name: string
        url:string
    }
}


interface any_obj {
    [k:string]:any
}

interface CTX {
    base_path:string
    opts:any_obj
    list:any_obj[]
    [k:string]:any
}

type next_function = () => Promise<void>

interface CTX_Function {
    (ctx:CTX,next:next_function):void
}

