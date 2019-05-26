"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class compose {
    constructor() {
        this.middlewares = [];
    }
    /** 加入 middlewares */
    add_mw(fun) {
        this.middlewares.push(fun);
    }
    run(ctx) {
        let index = -1;
        let self = this;
        async function dispatch(idx) {
            if (idx <= index)
                Promise.reject('run next two times');
            index = idx;
            if (idx == self.middlewares.length)
                return Promise.resolve();
            let f = self.middlewares[idx];
            return await f(ctx, dispatch.bind(null, idx + 1));
        }
        return dispatch(0);
    }
}
exports.default = compose;
