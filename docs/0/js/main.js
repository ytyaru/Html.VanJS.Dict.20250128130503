window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOMContentLoaded!!');
    const author = 'ytyaru'
    van.add(document.querySelector('main'), 
        van.tags.h1(van.tags.a({href:`https://github.com/${author}/Html.VanJS.Dict.20250128130503/`}, 'Dict')),
        van.tags.p('辞書。'),
//        van.tags.p('dictionary.'),
    )
    van.add(document.querySelector('footer'),  new Footer('ytyaru', '../').make())

    const a = new Assertion();
    // Dict.new()
    a.t(()=>{
        const d = Dict.new();
        const noneKeys = 0===Object.getOwnPropertyNames(d).length
        const nonePrototype = null===Object.getPrototypeOf(d)
        return noneKeys && nonePrototype 
    })
    a.t(()=>{
        const d = Dict.new({k:'v'});
        const keys = Object.getOwnPropertyNames(d)
        const vals = keys.map(k=>d[k])
        const nonePrototype = null===Object.getPrototypeOf(d)
        return 1===keys.length && 1===vals.length && 'k'===keys[0] && 'v'===vals[0] && nonePrototype 
    })
    a.t(()=>{
        const d = Dict.new({k:'v',n:1});
        const keys = Object.getOwnPropertyNames(d)
        const vals = keys.map(k=>d[k])
        const nonePrototype = null===Object.getPrototypeOf(d)
        return 2===keys.length && 2===vals.length
            && 'k'===keys[0] && 'v'===vals[0]
            && 'n'===keys[1] && 1===vals[1]
            && nonePrototype 
    })
    a.t(()=>{
        const d = Dict.new([['k','v']]);
        const keys = Object.getOwnPropertyNames(d)
        const vals = keys.map(k=>d[k])
        const nonePrototype = null===Object.getPrototypeOf(d)
        return 1===keys.length && 1===vals.length && 'k'===keys[0] && 'v'===vals[0] && nonePrototype 
    })
    a.t(()=>{
        const d = Dict.new([['k','v'],['n',1]]);
        const keys = Object.getOwnPropertyNames(d)
        const vals = keys.map(k=>d[k])
        const nonePrototype = null===Object.getPrototypeOf(d)
        return 2===keys.length && 2===vals.length
            && 'k'===keys[0] && 'v'===vals[0]
            && 'n'===keys[1] && 1===vals[1]
            && nonePrototype 
    })
    a.t(()=>{
        const d = Dict.new(['k','v']);
        console.log(d)
        const keys = Object.getOwnPropertyNames(d)
        const vals = keys.map(k=>d[k])
        const nonePrototype = null===Object.getPrototypeOf(d)
        return 1===keys.length && 1===vals.length && 'k'===keys[0] && 'v'===vals[0] && nonePrototype 
    })
    a.t(()=>{
        const d = Dict.new(['k','v','n',1]);
        console.log(d)
        const keys = Object.getOwnPropertyNames(d)
        const vals = keys.map(k=>d[k])
        const nonePrototype = null===Object.getPrototypeOf(d)
        return 2===keys.length && 2===vals.length
            && 'k'===keys[0] && 'v'===vals[0]
            && 'n'===keys[1] && 1===vals[1]
            && nonePrototype 
    })
    a.t(()=>{
        for (let value of [undefined, null, NaN, Infinity, '', 0]) { // 不正値を渡す
            const d = Dict.new(value);
            const noneKeys = 0===Object.getOwnPropertyNames(d).length
            const nonePrototype = null===Object.getPrototypeOf(d)
            if (!noneKeys || !nonePrototype){return false}
        }
        return true
    })
    a.t(()=>{
        const d = Dict.new({0:'v'}); // キーは整数型だが勝手に文字列型になる。JavaScriptの仕様。型例外発生させたいが不可能。
        const keys = Object.getOwnPropertyNames(d)
        const vals = keys.map(k=>d[k])
        const nonePrototype = null===Object.getPrototypeOf(d)
        return 1===keys.length && 1===vals.length && '0'===keys[0] && 'v'===vals[0] && nonePrototype && 'v'===d['0']
    })
    // Dict.has()
    a.t(()=>{
        const d = Dict.new();
        return !Dict.has(d, 'k') && !Dict.has(d, 'v')
    })
    a.t(()=>{
        const d = Dict.new({k:'v'});
        return Dict.has(d, 'k') && !Dict.has(d, 'v')
    })
    a.t(()=>{
        const d = Dict.new({k:'v',n:1});
        const keys = Object.getOwnPropertyNames(d)
        const vals = keys.map(k=>d[k])
        const nonePrototype = null===Object.getPrototypeOf(d)
        return 2===keys.length && keys.every(k=>Dict.has(d, k)) && nonePrototype && !Dict.has(d, 'x')
    })
    a.e(TypeError, `キーは文字列であるべきです。:0:number`, ()=>Dict.has(Dict.new(), 0))
    a.e(TypeError, `キーは文字列であるべきです。:k:object`, ()=>Dict.has(Dict.new(), ['k']))
    // Dict.hasEvery()
    a.t(()=>{
        const d = Dict.new();
        return !Dict.hasEvery(d, ['k']) && !Dict.hasEvery(d, ['v'])
    })
    a.t(()=>{
        const d = Dict.new({k:'v'});
        return Dict.hasEvery(d, ['k']) && !Dict.hasEvery(d, ['v'])
    })
    a.t(()=>{
        const d = Dict.new({k:'v',n:1});
        const keys = Object.getOwnPropertyNames(d)
        const vals = keys.map(k=>d[k])
        const nonePrototype = null===Object.getPrototypeOf(d)
        return 2===keys.length && Dict.hasEvery(d, keys) && nonePrototype
            && Dict.hasEvery(d, ['k']) && Dict.hasEvery(d, ['n']) && !Dict.hasEvery(d, ['x'])
            && !Dict.hasEvery(d, ['x','k']) && !Dict.hasEvery(d, ['k','x'])
            && !Dict.hasEvery(d, ['x','n']) && !Dict.hasEvery(d, ['k','x'])
            && Dict.hasEvery(d, ['k','n'])
            && !Dict.hasEvery(d, ['x','y'])
    })
    a.e(TypeError, `キー配列は配列型であるべきです。要素が一つ以上あるべきです。要素であるキーは文字列であるべきです。:0`, ()=>Dict.hasEvery(Dict.new(), 0))
    a.e(TypeError, `キー配列は配列型であるべきです。要素が一つ以上あるべきです。要素であるキーは文字列であるべきです。:0`, ()=>Dict.hasEvery(Dict.new(), [0]))
    // Dict.hasSome()
    a.t(()=>{
        const d = Dict.new();
        return !Dict.hasSome(d, ['k']) && !Dict.hasSome(d, ['v'])
    })
    a.t(()=>{
        const d = Dict.new({k:'v'});
        return Dict.hasSome(d, ['k']) && !Dict.hasSome(d, ['v'])
    })
    a.t(()=>{
        const d = Dict.new({k:'v',n:1});
        const keys = Object.getOwnPropertyNames(d)
        const vals = keys.map(k=>d[k])
        const nonePrototype = null===Object.getPrototypeOf(d)
        return 2===keys.length && Dict.hasSome(d, keys) && nonePrototype
            && Dict.hasSome(d, ['k']) && Dict.hasSome(d, ['n']) && !Dict.hasSome(d, ['x'])
            && Dict.hasSome(d, ['x','k']) && Dict.hasSome(d, ['k','x'])
            && Dict.hasSome(d, ['x','n']) && Dict.hasSome(d, ['k','n'])
            && Dict.hasSome(d, ['k','n'])
            && !Dict.hasSome(d, ['x','y'])
    })
    a.e(TypeError, `キー配列は配列型であるべきです。要素が一つ以上あるべきです。要素であるキーは文字列であるべきです。:0`, ()=>Dict.hasSome(Dict.new(), 0))
    a.e(TypeError, `キー配列は配列型であるべきです。要素が一つ以上あるべきです。要素であるキーは文字列であるべきです。:0`, ()=>Dict.hasSome(Dict.new(), [0]))





    a.t(()=>{
        const d = Dict.new();
        Object.setPrototypeOf(d, {'k':{value:'v'}})
        const p = Object.getPrototypeOf(d)
        return !Dict.has(d, 'k') && 'k' in d
    })
    a.fin()
});
window.addEventListener('beforeunload', (event) => {
    console.log('beforeunload!!');
});

