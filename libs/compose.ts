class compose{

    private middlewares:CTX_Function[]

    constructor(){
        this.middlewares = []
    }

    /** 加入 middlewares */
    add_mw(fun:CTX_Function){
        this.middlewares.push(fun)
    }

    run(ctx:CTX){
        let index = -1
        let self = this

        async function dispatch(idx:number):Promise<any>{
            if(idx <= index)
                Promise.reject('run next two times')

            index = idx

            if( idx == self.middlewares.length )
                return Promise.resolve()

            let f = self.middlewares[idx]

            return await f(ctx,dispatch.bind(null,idx+1))

        }

        return dispatch(0)

    }
}

export default compose
