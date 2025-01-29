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
        const d = Dict.new({0:'v'}); // キーは整数型だが勝手に文字列型になる。JavaScriptの仕様。型例外発生させたいが不可能。
        const keys = Object.getOwnPropertyNames(d)
        const vals = keys.map(k=>d[k])
        const nonePrototype = null===Object.getPrototypeOf(d)
        return 1===keys.length && 1===vals.length && '0'===keys[0] && 'v'===vals[0] && nonePrototype && 'v'===d['0']
    })
    // Dict.new() 異常系
    for (let value of [NaN, Infinity, 0, '']) { // 不正値を渡す
        a.e(TypeError, `Dict.new()の第一引数はundefined、null、オブジェクト、配列、二次元配列のみ有効です。{key:value,...}, [key,value,...], [[key,value],...]`, ()=>Dict.new(value))
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

    // Dict.keys() 順序が挿入順に保障されない！名前順にソートされているっぽい。ブラウザ実装によって変わりそう。
    a.t(()=>{
        const d = Dict.new();
        const keys = Dict.keys(d)
        return Array.isArray(keys) && 0===keys.length
    })
    a.t(()=>{
        const d = Dict.new({k:'v'});
        const keys = Dict.keys(d)
        console.log(keys)
        return Array.isArray(keys) && 1===keys.length && 'k'===keys[0]
    })
    a.t(()=>{
        const d = Dict.new({k:'v',n:1});
        const keys = Dict.keys(d)
        return Array.isArray(keys) && 2===keys.length && 'k'===keys[0] && 'n'===keys[1]
    })
    a.t(()=>{
        const d = Dict.new({k:'v',n:1,0:'zero'});
        const keys = Dict.keys(d)
        console.log(keys[2], '0'===keys[2], keys) // 挿入された順ではなく文字列で並び替えた順になるっぽい？
        //return Array.isArray(keys) && 3===keys.length && 'k'===keys[0] && 'n'===keys[1] && '0'===keys[2]
        return Array.isArray(keys) && 3===keys.length && 'k' in d && 'n' in d && '0' in d
    })

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

    // キーの数を取得する
    a.t(()=>0===Dict.size(Dict.new()))
    a.t(()=>1===Dict.size(Dict.new({k:'v'})))
    a.t(()=>2===Dict.size(Dict.new({k:'v',l:'w'})))
    a.t(()=>1===Dict.size(Dict.new([['k','v']])))
    a.t(()=>2===Dict.size(Dict.new([['k','v'],['l','w']])))
    a.t(()=>1===Dict.size(Dict.new(['k','v'])))
    a.t(()=>2===Dict.size(Dict.new(['k','v','l','w'])))
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
        return existed && deleted && 1===Dict.size(d) && 'l'===Dict.keys(d)[0] && 'w'===Dict.values(d)[0]
    })
    a.t(()=>{
        const d = Dict.new({k:'v', l:'w'})
        const existed = Dict.has(d, 'k')
        Dict.delete(d,'k')
        const deleted = !Dict.has(d, 'k')
        return existed && deleted && 1===Dict.size(d) && 'l'===Dict.keys(d)[0] && 'w'===Dict.values(d)[0]
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
        return existed && deleted && 1===Dict.size(d) && 'l'===Dict.keys(d)[0] && 'w'===Dict.values(d)[0]
    })
    a.t(()=>{
        const d = Dict.new([['k','v'],['l','w']])
        const existed = Dict.has(d, 'k')
        Dict.delete(d,'k')
        const deleted = !Dict.has(d, 'k')
        return existed && deleted && 1===Dict.size(d) && 'l'===Dict.keys(d)[0] && 'w'===Dict.values(d)[0]
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
        const d = Dict.new(['k','v','l','w'])
        const existed = Dict.has(d, 'k')
        delete d.k
        const deleted = !Dict.has(d, 'k')
        return existed && deleted && 1===Dict.size(d) && 'l'===Dict.keys(d)[0] && 'w'===Dict.values(d)[0]
    })
    a.t(()=>{
        const d = Dict.new(['k','v','l','w'])
        const existed = Dict.has(d, 'k')
        Dict.delete(d,'k')
        const deleted = !Dict.has(d, 'k')
        return existed && deleted && 1===Dict.size(d) && 'l'===Dict.keys(d)[0] && 'w'===Dict.values(d)[0]
    })
    a.t(()=>{ // 全削除
        const d = Dict.new(['k','v','l','w'])
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
    a.t(()=> Dict.isSame(Dict.new({k:'v'}),Dict.new(['k','v'])))
    a.t(()=> Dict.isSame(Dict.new([['k','v']]),Dict.new(['k','v'])))
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
    a.t(()=> Dict.isSameKey(Dict.new({k:'v'}),Dict.new(['k','v'])))
    a.t(()=> Dict.isSameKey(Dict.new([['k','v']]),Dict.new(['k','v'])))
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
    a.fin()
});
window.addEventListener('beforeunload', (event) => {
    console.log('beforeunload!!');
});

