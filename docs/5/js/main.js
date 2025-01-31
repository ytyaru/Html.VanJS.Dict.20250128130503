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
    // Dict.new() 正常系
    a.t(()=>{ // 空の辞書オブジェクトを返す
        const d = Dict.new(); // 第一引数にundefinedを渡したのと同じ
        const noneKeys = 0===Object.getOwnPropertyNames(d).length
        console.log('toString' in d)
        console.log('constructor' in d)
        return noneKeys
//        const nonePrototype = null===Object.getPrototypeOf(d)
//        console.log(noneKeys, nonePrototype )
//        return noneKeys && nonePrototype 
    })
    a.t(()=>{
        const d = Dict.new({k:'v'});
        const keys = Object.getOwnPropertyNames(d)
        const vals = keys.map(k=>d[k])
        //console.log(keys, vals, nonePrototype )
//        const nonePrototype = null===Object.getPrototypeOf(d)
//        return 1===keys.length && 1===vals.length && 'k'===keys[0] && 'v'===vals[0] && nonePrototype 
        return 1===keys.length && 1===vals.length && 'k'===keys[0] && 'v'===vals[0]
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
    a.e(TypeError, `指定されたキーは無効値です。文字列型かつ正規表現/^[a-zA-Z][_a-zA-Z0-9]$/に一致させてください。:null`, ()=>Dict.new([[null,'v']]))
    a.e(TypeError, `指定されたキーは無効値です。文字列型かつ正規表現/^[a-zA-Z][_a-zA-Z0-9]$/に一致させてください。:0`, ()=>Dict.new([[0,'v']]))
    a.e(TypeError, `Dict.newの第一引数はundefined,null,オブジェクト,配列,二次元配列,文字列のみ有効です。{key:'value',...},[key1,key2,...],[[key,value],...],'key1 key2'`, ()=>Dict.new([['k']]))
    a.e(TypeError, `Dict.newの第一引数はundefined,null,オブジェクト,配列,二次元配列,文字列のみ有効です。{key:'value',...},[key1,key2,...],[[key,value],...],'key1 key2'`, ()=>Dict.new([[0]]))
    a.e(TypeError, `Dict.newの第一引数はundefined,null,オブジェクト,配列,二次元配列,文字列のみ有効です。{key:'value',...},[key1,key2,...],[[key,value],...],'key1 key2'`, ()=>Dict.new([[]]))
    a.t(()=>{
        //const d = Dict.new(['k','v']);
        const d = Dict.new(['k']);
        console.log(d)
        const keys = Object.getOwnPropertyNames(d)
        const vals = keys.map(k=>d[k])
        console.log(keys, vals, d)
        return 1===keys.length && 1===vals.length && 'k'===keys[0] && null===vals[0]
//        const nonePrototype = null===Object.getPrototypeOf(d)
//        return 1===keys.length && 1===vals.length && 'k'===keys[0] && 'v'===vals[0] && nonePrototype 
    })
    a.t(()=>{
        //const d = Dict.new(['k','v']);
        const d = Dict.new(['k1','k2']);
        console.log(d)
        const keys = Object.getOwnPropertyNames(d)
        const vals = keys.map(k=>d[k])
        console.log(keys, vals, d)
        return 2===keys.length && 2===vals.length && 'k1'===keys[0] && 'k2'===keys[1] && vals.every(v=>v===null)
//        const nonePrototype = null===Object.getPrototypeOf(d)
//        return 1===keys.length && 1===vals.length && 'k'===keys[0] && 'v'===vals[0] && nonePrototype 
    })
    a.t(()=>{// 空の辞書
        const d = Dict.new([]);
        console.log(d)
        const keys = Object.getOwnPropertyNames(d)
        const vals = keys.map(k=>d[k])
        console.log(keys, vals, d)
        return 0===keys.length && 0===vals.length
    })
    a.e(TypeError, `Dict.newの第一引数はundefined,null,オブジェクト,配列,二次元配列,文字列のみ有効です。{key:'value',...},[key1,key2,...],[[key,value],...],'key1 key2'`, ()=>Dict.new([null]))
    a.e(TypeError, `Dict.newの第一引数はundefined,null,オブジェクト,配列,二次元配列,文字列のみ有効です。{key:'value',...},[key1,key2,...],[[key,value],...],'key1 key2'`, ()=>Dict.new([0]))
    a.t(()=>{
        //for (let value of [undefined, null, NaN, Infinity, '', 0]) { // 不正値を渡す
        for (let value of [undefined, null]) { // 空オブジェクトを意味する値を渡す
            const d = Dict.new(value);
            const noneKeys = 0===Object.getOwnPropertyNames(d).length
            const nonePrototype = null===Object.getPrototypeOf(d)
            if (!noneKeys || !nonePrototype){return false}
        }
        return true
    })
    a.t(()=>{
        const d = Dict.new('k')
        const keys = Object.getOwnPropertyNames(d)
        const vals = keys.map(k=>d[k])
        return 1===keys.length && 1===vals.length && 'k'===keys[0] && null===vals[0]
    })
    /*
    a.t(()=>{
        const d = Dict.new({0:'v'}); // キーは整数型だが勝手に文字列型になる。JavaScriptの仕様。型例外発生させたいが不可能。
        const keys = Object.getOwnPropertyNames(d)
        const vals = keys.map(k=>d[k])
        const nonePrototype = null===Object.getPrototypeOf(d)
        return 1===keys.length && 1===vals.length && '0'===keys[0] && 'v'===vals[0] && nonePrototype && 'v'===d['0']
    })
    */
    a.e(TypeError, `指定されたキーは無効値です。文字列型かつ正規表現/^[a-zA-Z][_a-zA-Z0-9]$/に一致させてください。:0`, ()=>Dict.new({0:'v'}))
    a.e(TypeError, `指定されたキーは無効値です。文字列型かつ正規表現/^[a-zA-Z][_a-zA-Z0-9]$/に一致させてください。:0`, ()=>Dict.new('0'))

    // Dict.new() 異常系
    //for (let value of [NaN, Infinity, 0, '']) { // 不正値を渡す
    for (let value of [NaN, Infinity, 0]) { // 不正値を渡す
        a.e(TypeError, `Dict.newの第一引数はundefined,null,オブジェクト,配列,二次元配列,文字列のみ有効です。{key:'value',...},[key1,key2,...],[[key,value],...],'key1 key2'`, ()=>Dict.new(value))
        //a.e(TypeError, `Dict.new()の第一引数はundefined、null、オブジェクト、配列、二次元配列のみ有効です。{key:value,...}, [key,value,...], [[key,value],...]`, ()=>Dict.new(value))
    }
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

    // 未定義キーを参照すると例外発生する
    a.e(TypeError, `指定されたキーは辞書に存在しません。:x`, ()=>{
        const d = Dict.new()
        d.x
    })
    // 未定義キーに代入すると例外発生する
    a.e(TypeError, `指定されたキーは辞書に存在しません。:x`, ()=>{
        const d = Dict.new()
        d.x = 'X'
    })
    // 参照できること
    a.t(()=>{
        const d = Dict.new({k:'v'})
        return Object.prototype.hasOwnProperty.call(d,'k') && 'v'===d.k
    })
    a.t(()=>{
        const d = Dict.new([['k','v']])
        return Object.prototype.hasOwnProperty.call(d,'k') && 'v'===d.k
    })
    a.t(()=>{
        const d = Dict.new(['k'])
        return Object.prototype.hasOwnProperty.call(d,'k') && null===d.k
    })
    a.t(()=>{
        const d = Dict.new('k')
        return Object.prototype.hasOwnProperty.call(d,'k') && null===d.k
    })
    // 代入できること（辞書オブジェクト自身から既存のキーに対して値変更ができること）
    a.t(()=>{
        const d = Dict.new({k:'v'})
        d.k = 'x'
        return Object.prototype.hasOwnProperty.call(d,'k') && 'x'===d.k
    })
    a.t(()=>{
        const d = Dict.new([['k','v']])
        d.k = 'x'
        return Object.prototype.hasOwnProperty.call(d,'k') && 'x'===d.k
    })
    a.t(()=>{
        const d = Dict.new(['k'])
        d.k = 'x'
        return Object.prototype.hasOwnProperty.call(d,'k') && 'x'===d.k
    })
    a.t(()=>{
        const d = Dict.new('k')
        d.k = 'x'
        return Object.prototype.hasOwnProperty.call(d,'k') && 'x'===d.k
    })
    // Dict.add（キーを新規追加できること）
    a.t(()=>{
        const d = Dict.new()
        Dict.add(d, 'x', 'X')
        const keys = Object.getOwnPropertyNames(d)
        const vals = keys.map(k=>d[k])
        return 1===keys.length && 1===vals.length && 'x'===keys[0] && 'X'===vals[0]
    })
    // 既存キーを削除できること
    a.t(()=>{
        const d = Dict.new({k:'v'})
        delete d.k
        return !Object.prototype.hasOwnProperty.call(d,'k')
    })
    a.t(()=>{
        const d = Dict.new([['k','v']])
        delete d.k
        return !Object.prototype.hasOwnProperty.call(d,'k')
    })
    a.t(()=>{
        const d = Dict.new(['k'])
        delete d.k
        return !Object.prototype.hasOwnProperty.call(d,'k')
    })
    a.t(()=>{
        const d = Dict.new('k')
        delete d.k
        return !Object.prototype.hasOwnProperty.call(d,'k')
    })
    // 追加キーを削除できること
    a.t(()=>{
        const d = Dict.new()
        Dict.add(d, 'x', 'X')
        delete d.x
        return !Object.prototype.hasOwnProperty.call(d,'x')
    })
    a.t(()=>{
        const d = Dict.new()
        Dict.add(d, 'x', 'X')
        Dict.add(d, 'y', 'Y')
        delete d.x
        console.log(Dict.keysAry(d))
        return !Object.prototype.hasOwnProperty.call(d,'x')
            &&  Object.prototype.hasOwnProperty.call(d,'y') && 1===Dict.keysAry(d).length && 'y'===Dict.keysAry(d)[0]
    })
    a.t(()=>{
        const d = Dict.new()
        Dict.add(d, 'x', 'X')
        Dict.add(d, 'y', 'Y')
        delete d.y
        console.log(Dict.keysAry(d))
        return  Object.prototype.hasOwnProperty.call(d,'x')
            && !Object.prototype.hasOwnProperty.call(d,'y') && 1===Dict.keysAry(d).length && 'x'===Dict.keysAry(d)[0]
    })




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
//    a.e(TypeError, `キー配列は配列型であるべきです。要素が一つ以上あるべきです。要素であるキーは文字列であるべきです。:0`, ()=>Dict.hasEvery(Dict.new(), 0))
//    a.e(TypeError, `キー配列は配列型であるべきです。要素が一つ以上あるべきです。要素であるキーは文字列であるべきです。:0`, ()=>Dict.hasEvery(Dict.new(), [0]))
    a.e(TypeError, `第一引数keysは文字列配列であるべきです。:0:number`, ()=>Dict.hasEvery(Dict.new(), 0))
    a.e(TypeError, `指定されたキーは無効値です。文字列型かつ正規表現/^[a-zA-Z][_a-zA-Z0-9]$/に一致させてください。:0`, ()=>Dict.hasEvery(Dict.new(), [0]))
    a.e(TypeError, `指定されたキーは無効値です。文字列型かつ正規表現/^[a-zA-Z][_a-zA-Z0-9]$/に一致させてください。:0`, ()=>Dict.hasEvery(Dict.new(), ['0']))
    a.e(TypeError, `指定されたキーは無効値です。文字列型かつ正規表現/^[a-zA-Z][_a-zA-Z0-9]$/に一致させてください。:_`, ()=>Dict.hasEvery(Dict.new(), ['_']))

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
//    a.e(TypeError, `キー配列は配列型であるべきです。要素が一つ以上あるべきです。要素であるキーは文字列であるべきです。:0`, ()=>Dict.hasSome(Dict.new(), 0))
//    a.e(TypeError, `キー配列は配列型であるべきです。要素が一つ以上あるべきです。要素であるキーは文字列であるべきです。:0`, ()=>Dict.hasSome(Dict.new(), [0]))
    a.e(TypeError, `第一引数keysは文字列配列であるべきです。:0:number`, ()=>Dict.hasSome(Dict.new(), 0))
    a.e(TypeError, `指定されたキーは無効値です。文字列型かつ正規表現/^[a-zA-Z][_a-zA-Z0-9]$/に一致させてください。:0`, ()=>Dict.hasSome(Dict.new(), [0]))
    a.e(TypeError, `指定されたキーは無効値です。文字列型かつ正規表現/^[a-zA-Z][_a-zA-Z0-9]$/に一致させてください。:0`, ()=>Dict.hasSome(Dict.new(), ['0']))
    a.e(TypeError, `指定されたキーは無効値です。文字列型かつ正規表現/^[a-zA-Z][_a-zA-Z0-9]$/に一致させてください。:_`, ()=>Dict.hasSome(Dict.new(), ['_']))

    // Dict.keys() イテレータである。順序が挿入順に保障されない！名前順にソートされているっぽい。ブラウザ実装によって変わりそう。
    a.t(()=>{
        const d = Dict.new();
        const keys = Dict.keys(d)
        return 'next' in keys && 'function'===typeof keys.next && 0===[...keys].length
//        console.log(keys)
//        return Array.isArray(keys) && 0===keys.length
    })
    a.t(()=>{
        const d = Dict.new({k:'v'});
        const keysItr = Dict.keys(d)
        const keysAry = [...Dict.keys(d)]
        return 'next' in keysItr && 'function'===typeof keysItr.next && 1===keysAry.length && Object.prototype.hasOwnProperty.call(d,'k') && 'k'===keysAry[0] && 'v'===d.k
        //return Array.isArray(keys) && 1===keys.length && 'k'===keys[0]
    })
    a.t(()=>{
        const d = Dict.new({k:'v',n:1});
        const keysItr = Dict.keys(d)
        const keysAry = [...Dict.keys(d)]
        return 'next' in keysItr && 'function'===typeof keysItr.next && 2===keysAry.length
        && Object.prototype.hasOwnProperty.call(d,'k') && 'k'===keysAry[0] && 'v'===d.k
        && Object.prototype.hasOwnProperty.call(d,'n') && 'n'===keysAry[1] &&   1===d.n
        //return Array.isArray(keys) && 2===keys.length && 'k'===keys[0] && 'n'===keys[1]
    })
    a.t(()=>{
        //const d = Dict.new({k:'v',n:1,0:'zero'});
        const d = Dict.new({k:'v',n:1,a:'A'});
        const keysItr = Dict.keys(d)
        const keysAry = Dict.keysAry(d)
        console.log(keysItr[2], 'a'===keysItr[2], keysItr) // 挿入された順ではなく文字列で並び替えた順になるっぽい？
        //return Array.isArray(keys) && 3===keys.length && 'k'===keys[0] && 'n'===keys[1] && '0'===keys[2]
        return 'next' in keysItr && 'function'===typeof keysItr.next && 3===keysAry.length
        && Object.prototype.hasOwnProperty.call(d,'k') && 'k'===keysAry[0] && 'v'===d.k
        && Object.prototype.hasOwnProperty.call(d,'n') && 'n'===keysAry[1] &&   1===d.n
        && Object.prototype.hasOwnProperty.call(d,'a') && 'a'===keysAry[2] && 'A'===d.a
    })
    // Dict.keysItr() イテレータである。順序が挿入順に保障されない！名前順にソートされているっぽい。ブラウザ実装によって変わりそう
    a.t(()=>{
        const d = Dict.new();
        const keys = Dict.keysItr(d)
        return 'next' in keys && 'function'===typeof keys.next && 0===[...keys].length
    })
    a.t(()=>{
        const d = Dict.new({k:'v'});
        const keysItr = Dict.keysItr(d)
        const keysAry = [...Dict.keys(d)]
        return 'next' in keysItr && 'function'===typeof keysItr.next && 1===keysAry.length && Object.prototype.hasOwnProperty.call(d,'k') && 'k'===keysAry[0] && 'v'===d.k
    })
    a.t(()=>{
        const d = Dict.new({k:'v',n:1});
        const keysItr = Dict.keysItr(d)
        const keysAry = [...Dict.keys(d)]
        return 'next' in keysItr && 'function'===typeof keysItr.next && 2===keysAry.length
        && Object.prototype.hasOwnProperty.call(d,'k') && 'k'===keysAry[0] && 'v'===d.k
        && Object.prototype.hasOwnProperty.call(d,'n') && 'n'===keysAry[1] &&   1===d.n
    })
    a.t(()=>{
        const d = Dict.new({k:'v',n:1,a:'A'});
        const keysItr = Dict.keysItr(d)
        const keysAry = Dict.keysAry(d)
        console.log(keysItr[2], 'a'===keysItr[2], keysItr) // 挿入された順ではなく文字列で並び替えた順になるっぽい？
        return 'next' in keysItr && 'function'===typeof keysItr.next && 3===keysAry.length
        && Object.prototype.hasOwnProperty.call(d,'k') && 'k'===keysAry[0] && 'v'===d.k
        && Object.prototype.hasOwnProperty.call(d,'n') && 'n'===keysAry[1] &&   1===d.n
        && Object.prototype.hasOwnProperty.call(d,'a') && 'a'===keysAry[2] && 'A'===d.a
    })
    // Dict.keysAry() 順序が挿入順に保障されない！名前順にソートされているっぽい。ブラウザ実装によって変わりそう。
    a.t(()=>{
        const d = Dict.new();
        const keys = Dict.keysAry(d)
        console.log(keys)
        return Array.isArray(keys) && 0===keys.length
    })
    a.t(()=>{
        const d = Dict.new({k:'v'});
        const keys = Dict.keysAry(d)
        console.log(keys)
        return Array.isArray(keys) && 1===keys.length && 'k'===keys[0]
    })
    a.t(()=>{
        const d = Dict.new({k:'v',n:1});
        const keys = Dict.keysAry(d)
        return Array.isArray(keys) && 2===keys.length && 'k'===keys[0] && 'n'===keys[1]
    })
    a.t(()=>{
        //const d = Dict.new({k:'v',n:1,0:'zero'});
        const d = Dict.new({k:'v',n:1,a:'A'});
        const keysAry = Dict.keysAry(d)
        console.log(keysAry[2], 'a'===keysAry[2], keysAry, d) // 挿入された順ではなく文字列で並び替えた順になるっぽい？
        //return Array.isArray(keys) && 3===keys.length && 'k'===keys[0] && 'n'===keys[1] && '0'===keys[2]
        return Array.isArray(keysAry) && 3===keysAry.length && 'k' in d && 'n' in d && 'a' in d
        && Object.prototype.hasOwnProperty.call(d,'k') && 'k'===keysAry[0] && 'v'===d.k
        && Object.prototype.hasOwnProperty.call(d,'n') && 'n'===keysAry[1] &&   1===d.n
        && Object.prototype.hasOwnProperty.call(d,'a') && 'a'===keysAry[2] && 'A'===d.a
    })
    // Dict.keysSet() 順序が挿入順に保障されない！名前順にソートされているっぽい。ブラウザ実装によって変わりそう。
    a.t(()=>{
        const d = Dict.new();
        const keysSet = Dict.keysSet(d)
        return keysSet instanceof Set && 0===keysSet.size
    })
    a.t(()=>{
        const d = Dict.new({k:'v'});
        const keysSet = Dict.keysSet(d)
        const keysAry = [...Dict.keys(d)]
        return keysSet instanceof Set && 1===keysSet.size && keysSet.has('k')
        && Object.prototype.hasOwnProperty.call(d,'k') && 'k'===keysAry[0] && 'v'===d.k
    })
    a.t(()=>{
        const d = Dict.new({k:'v',n:1});
        const keysSet = Dict.keysSet(d)
        const keysAry = [...Dict.keys(d)]
        return keysSet instanceof Set && 2===keysSet.size && keysSet.has('k') && keysSet.has('n')
        && Object.prototype.hasOwnProperty.call(d,'k') && 'k'===keysAry[0] && 'v'===d.k
        && Object.prototype.hasOwnProperty.call(d,'n') && 'n'===keysAry[1] &&   1===d.n
    })
    a.t(()=>{
        //const d = Dict.new({k:'v',n:1,0:'zero'});
        const d = Dict.new({k:'v',n:1,a:'A'});
        const keysSet = Dict.keysSet(d)
        const keysAry = Dict.keysAry(d)
        console.log(keysSet[2], 'a'===keysSet[2], keysSet) // 挿入された順ではなく文字列で並び替えた順になるっぽい？
        //return Array.isArray(keys) && 3===keys.length && 'k'===keys[0] && 'n'===keys[1] && '0'===keys[2]
        //return 'next' in keysSet && 'function'===typeof keysSet.next && 3===keysAry.length
        return keysSet instanceof Set && 3===keysSet.size && keysSet.has('k') && keysSet.has('n') && keysSet.has('a')
        && Object.prototype.hasOwnProperty.call(d,'k') && 'k'===keysAry[0] && 'v'===d.k
        && Object.prototype.hasOwnProperty.call(d,'n') && 'n'===keysAry[1] &&   1===d.n
        && Object.prototype.hasOwnProperty.call(d,'a') && 'a'===keysAry[2] && 'A'===d.a
    })

    // 辞書オブジェクトにプロトタイプをセットすることは禁止である。
    a.e(TypeError, `辞書オブジェクトにsetPrototypeOf()することを禁じます。`, ()=>{
        const d = Dict.new();
        Object.setPrototypeOf(d, {k:{value:'v'}}) // ここで例外発生する
        const p = Object.getPrototypeOf(d)
        return !Dict.has(d, 'k') && 'k' in d; // これにてin句でプロトタイプまで遡って存在確認してしまう混乱を回避する(has()との違いを失くす。ただしhas(),keys()等のメソッドを辞書オブジェクトが持つべきかどうかについては検討の余地あり。その場合、in句ではそれらメソッド名が存在することになり、辞書キーとの区別がつけられなくなって混乱するため、in句を使った辞書キー存在確認はできなくなる)
    })

    /*
    // プロトタイプを付加されても無視することを確認する（ただし組込in句は参照してしまう）
    a.t(()=>{
        const d = Dict.new();
        Object.setPrototypeOf(d, {k:{value:'v'}})
        const p = Object.getPrototypeOf(d)
        return !Dict.has(d, 'k') && 'k' in d
    })
    a.t(()=>{
        const d = Dict.new();
        Object.setPrototypeOf(d, {k:{value:'v'}})
        const p = Object.getPrototypeOf(d)
        const keys = Dict.keys(d)
        const values = Dict.values(d)
        const entries = Dict.entries(d)
        return 0===keys.length && 0===values.length && 0===entries.length && 'k' in d
    })
    */

    // キーの数を取得する
    a.t(()=>0===Dict.size(Dict.new()))
    a.t(()=>1===Dict.size(Dict.new({k:'v'})))
    a.t(()=>2===Dict.size(Dict.new({k:'v',l:'w'})))
    a.e(TypeError, `Dict.newの第一引数はundefined,null,オブジェクト,配列,二次元配列,文字列のみ有効です。{key:'value',...},[key1,key2,...],[[key,value],...],'key1 key2'`, ()=>0===Dict.size(Dict.new([[]])))
    a.t(()=>1===Dict.size(Dict.new([['k','v']])))
    a.t(()=>2===Dict.size(Dict.new([['k','v'],['l','w']])))
    a.t(()=>0===Dict.size(Dict.new([])))
    a.t(()=>1===Dict.size(Dict.new(['k1'])))
    a.t(()=>2===Dict.size(Dict.new(['k1','k2'])))
    a.e(TypeError, `指定されたキーは無効値です。文字列型かつ正規表現/^[a-zA-Z][_a-zA-Z0-9]$/に一致させてください。:`, ()=>0===Dict.size(Dict.new('')))
    a.t(()=>1===Dict.size(Dict.new('k1')))
    a.t(()=>2===Dict.size(Dict.new('k1 k2')))
    // キーの値を取得できること
    a.t(()=>{
        const d = Dict.new({k:'v'})
        return 'v'===d.k
    })
    a.t(()=>{
        const d = Dict.new({k:'v'})
        return 'v'===Dict.get(d,'k')
    })
    // キーの値を変更できること
    a.t(()=>{
        const d = Dict.new({k:'v'})
        const isV = 'v'===d.k
        d.k = 'x'
        const isX = 'x'===d.k
        return isV && isX
    })
    a.t(()=>{
        const d = Dict.new({k:'v'})
        const isV = 'v'===d.k
        Dict.set(d,'k','x')
        const isX = 'x'===d.k
        return isV && isX
    })
    // キーを削除できること（new Object版）
    a.t(()=>{
        const d = Dict.new({k:'v'})
        const existed = Dict.has(d, 'k')
        delete d.k
        const deleted = !Dict.has(d, 'k')
        return existed && deleted
    })
    a.t(()=>{
        const d = Dict.new({k:'v'})
        const existed = Dict.has(d, 'k')
        Dict.delete(d,'k')
        const deleted = !Dict.has(d, 'k')
        return existed && deleted
    })
    a.t(()=>{
        const d = Dict.new({k:'v', l:'w'})
        const existed = Dict.has(d, 'k')
        delete d.k
        const deleted = !Dict.has(d, 'k')
        console.log(existed , deleted , 1===Dict.size(d) , 'l'===Dict.keysAry(d)[0] , 'w'===Dict.values(d)[0])
        return existed && deleted && 1===Dict.size(d) && 'l'===Dict.keysAry(d)[0] && 'w'===Dict.values(d)[0]
    })
    a.t(()=>{
        const d = Dict.new({k:'v', l:'w'})
        const existed = Dict.has(d, 'k')
        Dict.delete(d,'k')
        const deleted = !Dict.has(d, 'k')
        return existed && deleted && 1===Dict.size(d) && 'l'===Dict.keysAry(d)[0] && 'w'===Dict.values(d)[0]
    })
    a.t(()=>{ // 全削除
        const d = Dict.new({k:'v', l:'w'})
        const existed = Dict.has(d, 'k')
        Dict.clear(d)
        const deleted = !Dict.has(d, 'k')
        return existed && deleted && 0===Dict.size(d) && !Dict.has(d,'k') && !Dict.has(d,'l')
    })
    // キーを削除できること（new 2DArray版）
    a.t(()=>{
        const d = Dict.new([['k','v']])
        const existed = Dict.has(d, 'k')
        delete d.k
        const deleted = !Dict.has(d, 'k')
        return existed && deleted
    })
    a.t(()=>{
        const d = Dict.new([['k','v']])
        const existed = Dict.has(d, 'k')
        Dict.delete(d,'k')
        const deleted = !Dict.has(d, 'k')
        return existed && deleted
    })
    a.t(()=>{
        const d = Dict.new([['k','v'],['l','w']])
        const existed = Dict.has(d, 'k')
        delete d.k
        const deleted = !Dict.has(d, 'k')
        return existed && deleted && 1===Dict.size(d) && 'l'===Dict.keysAry(d)[0] && 'w'===Dict.values(d)[0]
    })
    a.t(()=>{
        const d = Dict.new([['k','v'],['l','w']])
        const existed = Dict.has(d, 'k')
        Dict.delete(d,'k')
        const deleted = !Dict.has(d, 'k')
        return existed && deleted && 1===Dict.size(d) && 'l'===Dict.keysAry(d)[0] && 'w'===Dict.values(d)[0]
    })
    a.t(()=>{ // 全削除
        const d = Dict.new([['k','v'],['l','w']])
        const existed = Dict.has(d, 'k')
        Dict.clear(d)
        const deleted = !Dict.has(d, 'k')
        return existed && deleted && 0===Dict.size(d) && !Dict.has(d,'k') && !Dict.has(d,'l')
    })
    // キーを削除できること（new Array版）
    a.t(()=>{
        const d = Dict.new(['k','v'])
        const existed = Dict.has(d, 'k')
        delete d.k
        const deleted = !Dict.has(d, 'k')
        return existed && deleted
    })
    a.t(()=>{
        const d = Dict.new(['k','v'])
        const existed = Dict.has(d, 'k')
        Dict.delete(d,'k')
        const deleted = !Dict.has(d, 'k')
        return existed && deleted
    })
    a.t(()=>{
        //const d = Dict.new(['k','v','l','w'])
        const d = Dict.new(['k','l'])
        const existed = Dict.has(d, 'k')
        delete d.k
        const deleted = !Dict.has(d, 'k')
        return existed && deleted && 1===Dict.size(d) && 'l'===Dict.keysAry(d)[0] && null===Dict.values(d)[0]
    })
    a.t(()=>{
        const d = Dict.new(['k','l']);
        d.k='v'; d.l='w';
        const existed = Dict.has(d, 'k');
        delete d.k
        const deleted = !Dict.has(d, 'k')
        console.log(existed , deleted , 1===Dict.size(d) , 'l'===Dict.keysAry(d)[0] , 'w'===Dict.values(d)[0])
        return existed && deleted && 1===Dict.size(d) && 'l'===Dict.keysAry(d)[0] && 'w'===Dict.values(d)[0]
    })
    a.t(()=>{ // 全削除
        const d = Dict.new(['k','v','l','w'])
        const existed = Dict.has(d, 'k')
        Dict.clear(d)
        const deleted = !Dict.has(d, 'k')
        return existed && deleted && 0===Dict.size(d) && !Dict.has(d,'k') && !Dict.has(d,'l')
    })
    // キーを削除できること（String版）
    a.t(()=>{
        const d = Dict.new('k')
        const existed = Dict.has(d, 'k')
        delete d.k
        const deleted = !Dict.has(d, 'k')
        return existed && deleted
    })
    a.t(()=>{
        const d = Dict.new('k')
        d.k = 'v'
        const existed = Dict.has(d, 'k')
        Dict.delete(d,'k')
        const deleted = !Dict.has(d, 'k')
        return existed && deleted
    })
    a.t(()=>{
        //const d = Dict.new({k:'v', l:'w'})
        const d = Dict.new('k l')
        const existed = Dict.has(d, 'k')
        delete d.k
        const deleted = !Dict.has(d, 'k')
        console.log(existed , deleted , 1===Dict.size(d) , 'l'===Dict.keysAry(d)[0] , null===Dict.values(d)[0])
        return existed && deleted && 1===Dict.size(d) && 'l'===Dict.keysAry(d)[0] && null===Dict.values(d)[0]
    })
    a.t(()=>{
//        const d = Dict.new({k:'v', l:'w'})
        const d = Dict.new('k l')
        d.k='v'; d.l='w';
        const existed = Dict.has(d, 'k')
        Dict.delete(d,'k')
        const deleted = !Dict.has(d, 'k')
        return existed && deleted && 1===Dict.size(d) && 'l'===Dict.keysAry(d)[0] && 'w'===Dict.values(d)[0]
    })
    a.t(()=>{ // 全削除
//        const d = Dict.new({k:'v', l:'w'})
        const d = Dict.new('k l')
        d.k='v'; d.l='w';
        const existed = Dict.has(d, 'k')
        Dict.clear(d)
        const deleted = !Dict.has(d, 'k')
        return existed && deleted && 0===Dict.size(d) && !Dict.has(d,'k') && !Dict.has(d,'l')
    })

    // Dict.forEach()
    a.t(()=>{
        const d = Dict.new()
        let I = 0;
        Dict.forEach(d, (k,v,i)=>++I)
        return 0===I
    })
    a.t(()=>{
        const d = Dict.new({k:'v'})
        let I = 0;
        Dict.forEach(d, (k,v,i)=>++I)
        return 1===I
    })
    a.t(()=>{
        const d = Dict.new({k:'v',l:'w'})
        let I = 0;
        Dict.forEach(d, (k,v,i)=>++I)
        return 2===I
    })
    a.t(()=>{
        const d = Dict.new({k:'v'})
        let [K,V,I] = [null,null,null];
        Dict.forEach(d, (k,v,i)=>{K=k;V=v;I=i;})
        return 'k'===K && 'v'===V && 0===I
    })
    a.t(()=>{
        const d = Dict.new({k:'v',l:'w'})
        let [K,V,I] = [[],[],[]];
        Dict.forEach(d, (k,v,i)=>{K.push(k);V.push(v);I.push(i);})
        return 2===K.length && 'k'===K[0] && 'l'===K[1] 
            && 2===V.length && 'v'===V[0] && 'w'===V[1] 
            && 2===I.length &&   0===I[0] &&   1===I[1] 
    })

    // Dict.isEmpty()
    a.t(()=>Dict.isEmpty(Dict.new()))
    a.t(()=>!Dict.isEmpty(Dict.new({k:'v'})))

    // Dict.isSame()
    a.e(TypeError, `Dict.isSameは比較する二つ以上のDictが必要です。`, ()=>Dict.isSame())
    a.e(TypeError, `Dict.isSameは比較する二つ以上のDictが必要です。`, ()=>Dict.isSame(Dict.new()))
    a.t(()=> Dict.isSame(Dict.new(),Dict.new()))
    a.t(()=>!Dict.isSame(Dict.new(),Dict.new({k:'v'})))
    a.t(()=>!Dict.isSame(Dict.new({k:'v'}),Dict.new()))
    a.t(()=> Dict.isSame(Dict.new({k:'v'}),Dict.new({k:'v'})))
    a.t(()=> Dict.isSame(Dict.new({k:'v'}),Dict.new([['k','v']])))
    //a.t(()=> Dict.isSame(Dict.new({k:'v'}),Dict.new(['k','v'])))
    a.t(()=>!Dict.isSame(Dict.new({k:'v'}),Dict.new(['k','v']))) // ['k','v']は二つのキー
    a.t(()=> Dict.isSame(Dict.new({k:'v'}),(()=>{const d=Dict.new(['k']);d.k='v';return d})()))
//    a.t(()=> Dict.isSame(Dict.new([['k','v']]),Dict.new(['k','v'])))
    a.t(()=>!Dict.isSame(Dict.new([['k','v']]),Dict.new(['k','v']))) // ['k','v']は二つのキー
    a.t(()=> Dict.isSame(Dict.new([['k','v']]),(()=>{const d=Dict.new(['k']);d.k='v';return d})()))
    a.t(()=>!Dict.isSame(Dict.new({k:'v'}),Dict.new({k:'x'}))) // 値が違う
    a.t(()=>!Dict.isSame(Dict.new({k:'v'}),Dict.new({l:'v'}))) // キー名が違う

    a.t(()=> Dict.isSame(Dict.new(),Dict.new(),Dict.new()))
    a.t(()=> Dict.isSame(Dict.new({k:'v'}),Dict.new({k:'v'}),Dict.new({k:'v'})))
    a.t(()=>!Dict.isSame(Dict.new({k:'v'}),Dict.new({k:'v'}),Dict.new({k:'x'}))) // 値が一つだけ違う
    a.t(()=>!Dict.isSame(Dict.new({k:'v'}),Dict.new({k:'x'}),Dict.new({k:'v'})))
    a.t(()=>!Dict.isSame(Dict.new({k:'x'}),Dict.new({k:'v'}),Dict.new({k:'v'})))
    a.t(()=>!Dict.isSame(Dict.new({k:'v'}),Dict.new({k:'v'}),Dict.new({l:'v'}))) // キー名が一つだけ違う
    a.t(()=>!Dict.isSame(Dict.new({k:'v'}),Dict.new({l:'v'}),Dict.new({k:'v'})))
    a.t(()=>!Dict.isSame(Dict.new({l:'v'}),Dict.new({k:'v'}),Dict.new({k:'v'})))

    // Dict.isSameKey()
    a.e(TypeError, `Dict.isSameKeyは比較する二つ以上のDictが必要です。`, ()=>Dict.isSameKey())
    a.e(TypeError, `Dict.isSameKeyは比較する二つ以上のDictが必要です。`, ()=>Dict.isSameKey(Dict.new()))
    a.t(()=> Dict.isSameKey(Dict.new(),Dict.new()))
    a.t(()=>!Dict.isSameKey(Dict.new(),Dict.new({k:'v'})))
    a.t(()=>!Dict.isSameKey(Dict.new({k:'v'}),Dict.new()))
    a.t(()=> Dict.isSameKey(Dict.new({k:'v'}),Dict.new({k:'v'})))
    a.t(()=> Dict.isSameKey(Dict.new({k:'v'}),Dict.new([['k','v']])))
    //a.t(()=> Dict.isSameKey(Dict.new({k:'v'}),Dict.new(['k','v'])))
    a.t(()=>!Dict.isSameKey(Dict.new({k:'v'}),Dict.new(['k','v']))) // ['k','v']は二つのキー
    a.t(()=> Dict.isSameKey(Dict.new({k:'v'}),(()=>{const d=Dict.new(['k']);d.k='v';return d})()))
    //a.t(()=> Dict.isSameKey(Dict.new({k:'v'}),Dict.new(['k','v'])))
//    a.t(()=>!Dict.isSameKey(Dict.new({k:'v'}),Dict.new(['k','v']))) // ['k','v']は二つのキー
//    a.t(()=> Dict.isSameKey(Dict.new({k:'v'}),(()=>{const d=Dict.new(['k']);d.k='v';return d})()))
    //a.t(()=> Dict.isSameKey(Dict.new([['k','v']]),Dict.new(['k','v'])))
    a.t(()=>!Dict.isSameKey(Dict.new([['k','v']]),Dict.new(['k','v'])))
    a.t(()=> Dict.isSameKey(Dict.new([['k','v']]),(()=>{const d=Dict.new(['k']);d.k='v';return d})()))
    a.t(()=> Dict.isSameKey(Dict.new({k:'v'}),Dict.new({k:'x'}))) // 値が違う
    a.t(()=>!Dict.isSameKey(Dict.new({k:'v'}),Dict.new({l:'v'}))) // キー名が違う

    a.t(()=> Dict.isSameKey(Dict.new(),Dict.new(),Dict.new()))
    a.t(()=> Dict.isSameKey(Dict.new({k:'v'}),Dict.new({k:'v'}),Dict.new({k:'v'})))
    a.t(()=> Dict.isSameKey(Dict.new({k:'v'}),Dict.new({k:'v'}),Dict.new({k:'x'}))) // 値が一つだけ違う
    a.t(()=> Dict.isSameKey(Dict.new({k:'v'}),Dict.new({k:'x'}),Dict.new({k:'v'})))
    a.t(()=> Dict.isSameKey(Dict.new({k:'x'}),Dict.new({k:'v'}),Dict.new({k:'v'})))
    a.t(()=>!Dict.isSameKey(Dict.new({k:'v'}),Dict.new({k:'v'}),Dict.new({l:'v'}))) // キー名が一つだけ違う
    a.t(()=>!Dict.isSameKey(Dict.new({k:'v'}),Dict.new({l:'v'}),Dict.new({k:'v'})))
    a.t(()=>!Dict.isSameKey(Dict.new({l:'v'}),Dict.new({k:'v'}),Dict.new({k:'v'})))

    /*
    // キー追加と参照の区別ができない！　よってタイポしてもキー追加されてしまう！　例外発生して欲しいのに！
    a.t(()=>{
        const d = Dict.new({yamada:12})
        a.t(12===d.yamada)
        d.yamaDa = 13 // タイポ（yamadaのはずだった）ここで例外発生して欲しかった。Dict.new/Dict.addしたキーのみ代入可能にしたい。この要件を実装するには辞書オブジェクトをProxyにするしかない。
        a.t(12===d.yamada)
        a.t(13===d.yamaDa)
        a.t(2===Dict.size(d)) // タイポしたキーが追加されてしまっている！
        return 1===Dict.size(d)
    })
    */
    // キー追加と参照の区別ができる。よってタイポ参照したら例外発生してくれる。
    a.e(TypeError, `指定されたキーは辞書に存在しません。:yamaDa`, ()=>{
        const d = Dict.new({yamada:12})
        a.t(12===d.yamada)
        d.yamaDa = 13 // タイポ（yamadaのはずだった）ここで例外発生してくれる。Dict.new/Dict.addで指定したキーのみ代入可能。
        // 以下のような事態は起きない。
        /*
        a.t(12===d.yamada)
        a.t(13===d.yamaDa)
        a.t(2===Dict.size(d)) // タイポしたキーが追加されてしまっている！
        return 1===Dict.size(d)
        */
    })
    a.e(TypeError, `指定されたキーは辞書に存在しません。:yamaDa`, ()=>{
        const d = Dict.new()
        Dict.add(d, 'yamada', 12)
        a.t(12===d.yamada)
        d.yamaDa = 13 // タイポ（yamadaのはずだった）ここで例外発生してくれる。Dict.new/Dict.addで指定したキーのみ代入可能。
        // 以下のような事態は起きない。
        /*
        a.t(12===d.yamada)
        a.t(13===d.yamaDa)
        a.t(2===Dict.size(d)) // タイポしたキーが追加されてしまっている！
        return 1===Dict.size(d)
        */
    })
    a.e(TypeError, `指定されたキーは辞書に存在しません。:yamaDa`, ()=>{
        const d = Dict.new({yamada:12})
        a.t(12===d.yamada)
        d.yamaDa // タイポ（yamadaのはずだった）ここで例外発生してくれる。Dict.new/Dict.addで指定したキーのみ参照可能。
    })
    a.e(TypeError, `指定されたキーは辞書に存在しません。:yamaDa`, ()=>{
        const d = Dict.new()
        Dict.add(d, 'yamada', 12)
        a.t(12===d.yamada)
        d.yamaDa // タイポ（yamadaのはずだった）ここで例外発生してくれる。Dict.new/Dict.addで指定したキーのみ参照可能。
    })

    a.fin()
});
window.addEventListener('beforeunload', (event) => {
    console.log('beforeunload!!');
});

