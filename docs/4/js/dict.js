;(function(){
class KeyMap { // DictのProxyのキー一覧を保持する（ProxyとTargetの両インスタンスをキーにしたい）
    constructor(){this._list=[]}
    clear(){this._list.length=0}
    delete(proxyOrTarget){this._list.length=0}
    // proxyかtargetのいずれかが一致すれば存在すると判定する
    add(proxy, target, keys) {this._list.push({proxy:proxy, target:target, keys:keys})}
    get(proxyOrTarget) {return this._list.find(item=>item.proxy===proxyOrTarget || item.target===proxyOrTarget)}
    has(proxyOrTarget) {return !!this.get(proxyOrTarget)}
    getKeys(proxyOrTarget) {return this.get(proxyOrTarget)?.keys}
    setKeys(proxyOrTarget, keys) {
//        const i = this._list.findIndex(item=>item.proxy===proxyOrTarget || item.target===proxyOrTarget)
        const i = this.#fi(proxyOrTarget)
        if (-1<i){this._list[i].keys = keys}
    }
    deleteKey(proxyOrTarget, key) {
        const i = this.#fi(proxyOrTarget)
        this._list[i].keys.delete(key)
    }
    addKey(proxyOrTarget, key) {
        const i = this.#fi(proxyOrTarget)
        this._list[i].keys.add(key)
    }
    #fi(proxyOrTarget){return this._list.findIndex(item=>item.proxy===proxyOrTarget || item.target===proxyOrTarget)}
    /*
    isExist(proxyOrTarget) {return this._list.some(item=>item.proxy===proxyOrTarget || item.target===proxyOrTarget)}
    has(proxyOrTarget, key) {
        const item === this._list.find(item=>item.proxy===proxyOrTarget || item.target===proxyOrTarget)
    }
    */
}
class Dict {
    /*
    static #KEY_MAP = new WeakMap();
    static #KEY_MAP_T = new WeakMap();
    static #KEY_MAP_M = []; // [{proxy:null, target:null, keys:new Set()}]
    static #KEY_MAP = new KeyMap();
    */
    static KEY_MAP = new KeyMap();
//    static new(obj=null){
    static new(obj){
        //if (null===obj || undefined===obj){obj=Object.create(null)}
        //if (!this.#isObj(obj)){throw new TypeError(`Dict.newの第一引数はnull,undefined,オブジェクト,配列,二次元配列のみ有効です。{key:'value'},[key1,key2,...],[[key,value],...]`)}
        //if (!this.#isObj(obj)){throw new TypeError(`Dict.newの第一引数はオブジェクト,配列,二次元配列のみ有効です。{key:'value',...},[key1,key2,...],[[key,value],...]`)}
        //if (!this.#isObj(obj)){throw new TypeError(`Dict.newの第一引数はオブジェクトのみ有効です。{key:'value',...},[key1,key2,...],[[key,value],...]`)}
        /*
        const handler = {
            get(dict, key, receiver) {
                Dict.throwHas(dict, key)
                Dict.throwValidKey(key)
//                if (!Dict.has(dict, key)) {throw new TypeError(`指定されたキーは辞書に存在しません。:${key}`)}
//                if (!this.isValidKey(key)) {throw new TypeError(`指定されたキーは無効値です。文字列型かつ正規表現/^[a-zA-Z][_a-zA-Z0-9]$/に一致させてください。:${key}`)}
                return dict[key]
            },
            set(dict, key, value, receiver) {
                Dict.throwHas(dict, key)
                Dict.throwValidKey(key)
//                if (!Dict.has(dict, key)) {throw new TypeError(`指定されたキーは辞書に存在しません。:${key}`)}
//                if (!this.isValidKey(key)) {throw new TypeError(`指定されたキーは無効値です。文字列型かつ正規表現/^[a-zA-Z][_a-zA-Z0-9]$/に一致させてください。:${key}`)}
                dict[key] = value
                return true
            },
        }
        */
        const keys = this.#makeKeyList(obj)
        //if (!keys.every(k=>this.isValidKey(k))){throw new TypeError(`指定されたキーは無効値です。文字列型かつ正規表現/^[a-zA-Z][_a-zA-Z0-9]$/に一致させてください。:${key}`)}
        Dict.throwValidKeys(keys)
        //const dict = new Proxy(obj, handler)
        //const dict = new Proxy(this.#makeTarget(obj), this.#makeHandler())
        const target = this.#makeTarget(obj)
        const proxy = new Proxy(target, this.#makeHandler())
        //this.#KEY_MAP.set(dict, new Set([...Object.keys(obj)]))
//        this.#KEY_MAP.set(dict, new Set(keys))
        //this.#KEY_MAP.set(target, new Set(keys))
//        this.#KEY_MAP_T.set(target, new Set(keys))
        //this.#KEY_MAP.add(proxy, target, new Set(keys))
        this.KEY_MAP.add(proxy, target, new Set(keys))
        return proxy
    }
    static #makeKeyList(obj) {
//        if (Array.isArray(obj) && obj.every(o=>Array.isArray(o) && 2===o.length)) {obj.reduce((a,v,i)=>a.push(v[0]),[])}
        if (Array.isArray(obj) && obj.every(o=>Array.isArray(o) && 2===o.length)) {return obj.map(o=>o[0])}
        else if (this.#isStrs(obj)) {return obj}
        else if (this.#isObj(obj)){return [...Object.keys(obj)]}
        else if (this.#isStr(obj)){return obj.split(' ')}
        else if (undefined===obj || null===obj){return []}
        else {throw new TypeError(`Dict.newの第一引数はundefined,null,オブジェクト,配列,二次元配列,文字列のみ有効です。{key:'value',...},[key1,key2,...],[[key,value],...],'key1 key2'`)}
    }
    static #makeTarget(obj) {return BlankObject.new(this.#makeTargetObject(obj))}
    /*
    static #makeTarget(obj) {
        if (Array.isArray(obj) && obj.every(o=>Array.isArray(o) && 2===o.length)) {return obj.reduce((o,kv,i)=>o[kv[0]]=kv[1],{})}
//        if (Array.isArray(obj) && obj.every(o=>Array.isArray(o) && 2===o.length)) {return obj.map(o=>o[0])}
        else if (this.#isStrs(obj)) {return obj.reduce((o,k,i)=>o[k]=null,{})}
        else if (this.#isStr(obj)){return obj.split(' ').reduce((o,k,i)=>o[k]=null,{})}
        else if (undefined===obj || null===obj){return ({})}
        else if (this.#isObj(obj)){return obj}
        else {throw new TypeError(`Dict.newの第一引数はundefined,null,オブジェクト,配列,二次元配列,文字列のみ有効です。{key:'value',...},[key1,key2,...],[[key,value],...],'key1 key2'`)}
    }
    */
    static #makeTargetObject(obj) {// 配列,二次元配列,文字列などを辞書風オブジェクトに変換する
        //console.log(obj)
        //if (Array.isArray(obj)){console.log(obj.every(o=>Array.isArray(o) && 2===o.length), obj.reduce((o,kv,i)=>o[kv[0]]=kv[1],{}))}

//const obj = array.reduce((obj, [key, value]) => Object.assign(obj, {[key]: value}), {});
        if (Array.isArray(obj) && obj.every(o=>Array.isArray(o) && 2===o.length)) {return obj.reduce((o,[k,v])=>Object.assign(o,{[k]:v}),({}))}
        //if (Array.isArray(obj) && obj.every(o=>Array.isArray(o) && 2===o.length)) {return obj.reduce((o,kv,i)=>o[kv[0]]=kv[1],{})}
//        if (Array.isArray(obj) && obj.every(o=>Array.isArray(o) && 2===o.length)) {return obj.map(o=>o[0])}
        //else if (this.#isStrs(obj)) {return obj.reduce((o,k,i)=>o[k]=null,{})}
//        else if (this.#isStr(obj)){return obj.split(' ').reduce((o,k,i)=>o[k]=null,{})}
        else if (this.#isStrs(obj)) {return obj.reduce((o,k,i)=>Object.assign(o,{[k]:null}),({}))}
        else if (undefined===obj || null===obj){return ({})}
        else if (this.#isStr(obj)){return obj.split(' ').reduce((o,k,i)=>Object.assign(o,{[k]:null}),({}))}
        else if (this.#isObj(obj)){return obj}
        else {throw new TypeError(`Dict.newの第一引数はundefined,null,オブジェクト,配列,二次元配列,文字列のみ有効です。{key:'value',...},[key1,key2,...],[[key,value],...],'key1 key2'`)}
    }
    static #makeHandler() { return {
        get(dict, key, receiver) {
            console.log(`Handler.get():`, dict, key, receiver)
//            Dict.throwHas(receiver, key)
            Dict.throwHas(dict, key)
            Dict.throwValidKey(key)
//            if (!Dict.has(dict, key)) {throw new TypeError(`指定されたキーは辞書に存在しません。:${key}`)}
//            if (!this.isValidKey(key)) {throw new TypeError(`指定されたキーは無効値です。文字列型かつ正規表現/^[a-zA-Z][_a-zA-Z0-9]$/に一致させてください。:${key}`)}
            return dict[key]
        },
        set(dict, key, value, receiver) {
            //Dict.throwHas(receiver, key)
            Dict.throwHas(dict, key)
            Dict.throwValidKey(key)
//            if (!Dict.has(dict, key)) {throw new TypeError(`指定されたキーは辞書に存在しません。:${key}`)}
//            if (!this.isValidKey(key)) {throw new TypeError(`指定されたキーは無効値です。文字列型かつ正規表現/^[a-zA-Z][_a-zA-Z0-9]$/に一致させてください。:${key}`)}
            dict[key] = value
            return true
        },
        deleteProperty(target, key) { // レシーバを受け取れない！　キーマップ検索できない！
            //Dict.throwHas(receiver, key)
            Dict.throwHas(target, key)
            Dict.throwValidKey(key)
            delete target[key]
            //this.#KEY_MAP.get(dict).delete(key)
//            this.#KEY_MAP_T.get(dict).delete(key)
            //this.#KEY_MAP.deleteKey(target, key)
            //this.KEY_MAP.deleteKey(target, key)
            Dict.KEY_MAP.deleteKey(target, key)
        }
    } }
    static #isObj(obj) {return null!==obj && undefined!==obj && 'object'===typeof obj && '[object Object]'===Object.prototype.toString.call(obj)}
    static #isStr(str) {return 'string'===typeof str || str instanceof String;}
    static #isStrs(keys){return Array.isArray(keys) ? keys.every(k=>this.#isStr(k)) : false}
    // Keyの先頭に数字が使えない：プログラミング言語における制約。数値と区別するため。
    // Keyの先頭に_が使えない：プログラミング言語では使えるが、将来オブジェクトにメソッドを追加するとき_has(),_keys()のようにしたい
    static isValidKey(key) {return this.#isStr(key) && /^[a-zA-Z][_a-zA-Z0-9]*$/.test(key)}
    static throwValidKey(key) {console.log(this.#isStr(key), /^[a-zA-Z][_a-zA-Z0-9]*$/.test(key), key);if(!this.isValidKey(key)){throw new TypeError(`指定されたキーは無効値です。文字列型かつ正規表現/^[a-zA-Z][_a-zA-Z0-9]$/に一致させてください。:${key}`)}}
    static throwValidKeys(keys){
        if (!Array.isArray(keys)){throw new TypeError(`第一引数は文字列型の配列であるべきです。`)}
        keys.every(k=>this.throwValidKey(k))
    }
    static isExist(dict) {// 辞書存在確認
        //const keySet = this.#KEY_MAP.get(dict)
        //const keySet = this.#KEY_MAP.getKeys(dict)
//        const keySet = this.KEY_MAP.getKeys(dict)
        if (!this.KEY_MAP.has(dict)){throw new TypeError(`指定されたオブジェクトはDict.newされた辞書ではありません。`)}
//        if (undefined===keySet){throw new TypeError(`指定されたオブジェクトはDict.newされた辞書ではありません。`)}
//        return keySet
        return this.KEY_MAP.getKeys(dict)
    }
    // キー存在確認
    //static has(dict, key) {return this.isExist(dict).has(key)}
    static has(dict, key) {
        if (!this.#isStr(key)){throw new TypeError(`キーは文字列であるべきです。:${key}:${typeof key}`)}
        return this.isExist(dict).has(key)
    }
    /*
    static has(dict, key) {// キー存在確認
        const keySet = this.#KEY_MAP.get(dict)
        if (undefined===keySet){throw new TypeError(`指定されたオブジェクトはDict.newされた辞書ではありません。`)}
        return keySet.has(key)
    }
    */
    //static throwHas(dict, key) {if (!Dict.has(dict, key)) {throw new TypeError(`指定されたキーは辞書に存在しません。:${key}`)}}
    static throwHas(dict, key) {if (!this.has(dict, key)) {throw new TypeError(`指定されたキーは辞書に存在しません。:${key}`)}}
    static add(dict, key, value) {// キー追加
        if (this.has(dict, key)){throw new TypeError(`Dict.addの第二引数で指定されたキーは既存です。`)}
        //dict[key] = value;
        
        //Reflect.set(dict, key, value)
        Reflect.set(this.KEY_MAP.get(dict).target, key, value)
        console.log(dict)
        this.KEY_MAP.addKey(dict, key)
        console.log(this.KEY_MAP.get(dict).keys)
        /*
        if (this.has(dict, key)){throw new TypeError(`Dict.addの第二引数で指定されたキーは既存です。`)}
        //const keySet = this.#KEY_MAP.get(dict)
        const keySet = this.#KEY_MAP.getKeys(dict)
        //const keySet = this.KEY_MAP.getKeys(dict)
        keySet.add(key)
        dict[key] = value;
        */
        /*
        const keySet = this.#KEY_MAP.get(dict)
        if (undefined===keySet){throw new TypeError(`Dict.addの第一引数で指定されたオブジェクトはDict.newされた辞書ではありません。`)}
        if (keySet.has(key)){throw new TypeError(`Dict.addの第二引数で指定されたキーは既存です。`)}
        keySet.add(key)
        dict[key] = value;
        */
    }
//    const D = [...Object.keys(D)]
//    .size === dict
    static keys(dict) {return this.keysItr(dict)}
    static keysItr(dict) {return this.isExist(dict).keys()}
    static keysAry(dict) {return [...this.isExist(dict).keys()]}
    static keysSet(dict) {return this.isExist(dict)}
    /*
    static keys(dict) {
        const keySet = this.isExist(dict)
        return [...keySet.keys()]
    }
    */
}
class BlankObject {
    static new(obj) {// {key:'value'}, [['key','value']], ['key','value','key2','val2']
        return Object.create(null, this.#getPropObj(obj))
    }
    static #getPropObj(obj) {
        if (Array.isArray(obj) && obj.every(o=>Array.isArray(o))) {return this.#makePropObjFromArys(obj)}
        else if (Array.isArray(obj) && 0===(obj.length % 2)){return this.#makePropObjFromAry(obj)}
        else if (this.#isObj(obj)){return this.#makePropObjFromObj(obj)}
        else if (undefined===obj || null===obj){return undefined}
        else {console.log(obj);throw new TypeError(`Dict.new()の第一引数はundefined、null、オブジェクト、配列、二次元配列のみ有効です。{key:value,...}, [key,value,...], [[key,value],...]`)}
    }
    static #makePropObjFromArys(arys) {return arys.reduce((obj,[k,v])=>{this.#throwKey(k);return Object.assign(obj,{[k]:this.#getDescriptor(v)})}, Object.create(null))}
    static #makePropObjFromAry(ary) {
        const obj = Object.create(null);
        for (let i=0; i<ary.length; i+=2) { this.#throwKey(ary[i]); obj[ary[i]] = this.#getDescriptor(ary[i+1]); }
        return obj;
    }
    static #makePropObjFromObj(inObj) {
        const keys = Object.getOwnPropertyNames(inObj)
        keys.every(k=>this.#throwKey(k))
        return keys.reduce((obj,k)=>Object.assign(obj,{[k]:this.#getDescriptor(inObj[k])}), Object.create(null))
    }
    static #getDescriptor(v){return {value:v, enumerable:true, configurable:true, writable:true}} // 列挙,削除,書換 可能

    static #isObj(obj) {return null!==obj && undefined!==obj && 'object'===typeof obj && '[object Object]'===Object.prototype.toString.call(obj)}
    static #isStr(key){return 'string'===typeof key || key instanceof String;}
    static #throwKey(key){if(!this.#isStr(key)){throw new TypeError(`キーは文字列であるべきです。:${key}:${typeof key}`)}}
}
/*
class Dict {
    static new(obj=null) {// {key:'value'}, [['key','value']], ['key','value','key2','val2']
        const propObj = this.#getPropObj(obj);
        return Object.create(null, propObj)
    }
    static #isObj(obj) {return null!==obj && undefined!==obj && 'object'===typeof obj && '[object Object]'===Object.prototype.toString.call(obj)}
    static #getPropObj(obj) {
        if (Array.isArray(obj) && obj.every(o=>Array.isArray(o))) {return this.#makePropObjFromArys(obj)}
        else if (Array.isArray(obj) && 0===(obj.length % 2)){return this.#makePropObjFromAry(obj)}
        else if (this.#isObj(obj)){return this.#makePropObjFromObj(obj)}
        else if (undefined===obj || null===obj){return undefined}
        else {throw new TypeError(`Dict.new()の第一引数はundefined、null、オブジェクト、配列、二次元配列のみ有効です。{key:value,...}, [key,value,...], [[key,value],...]`)}
    }
    static #isStr(key){return 'string'===typeof key || key instanceof String;}
    static #isStrs(keys){return Array.isArray(keys) ? keys.every(k=>this.#isStr(k)) : false}
    static #throwKey(key){if(!this.#isStr(key)){throw new TypeError(`キーは文字列であるべきです。:${key}:${typeof key}`)}}
    static #throwKeys(keys){if(!this.#isStrs(keys) || Array.isArray(keys) && 0===keys.length){throw new TypeError(`キー配列は配列型であるべきです。要素が一つ以上あるべきです。要素であるキーは文字列であるべきです。:${keys}`)}}
    static #makePropObjFromArys(arys) {return arys.reduce((obj,[k,v])=>{this.#throwKey(k);return Object.assign(obj,{[k]:this.#getDescriptor(v)})}, Object.create(null))}
    static #makePropObjFromAry(ary) {
        const obj = Object.create(null);
        for (let i=0; i<ary.length; i+=2) { this.#throwKey(ary[i]); obj[ary[i]] = this.#getDescriptor(ary[i+1]); }
        return obj;
    }
    static #makePropObjFromObj(inObj) {
        const keys = Object.getOwnPropertyNames(inObj)
        keys.every(k=>this.#throwKey(k))
        return keys.reduce((obj,k)=>Object.assign(obj,{[k]:this.#getDescriptor(inObj[k])}), Object.create(null))
    }
    static #getDescriptor(v){return {value:v, enumerable:true, configurable:true, writable:true}} // 列挙,削除,書換 可能
    static has(dict, key) {return !this.#throwKey(key) && Object.prototype.hasOwnProperty.call(dict, key)}
    static keys(dict){return [...Object.keys(dict)]}// 勝手に文字列順でソートされる？
    static values(dict){return this.keys(dict).map(k=>dict[k])}
    static entries(dict){return this.keys(dict).map(k=>[k, dict[k]])}
    // new Mapには無いが、あったほうが便利かも？
    static hasEvery(dict, keys){return this.#hasES(dict, keys, 'every')}
    static hasSome(dict, keys){return this.#hasES(dict, keys, 'some')}
    static #hasES(dict, keys, ES) {return !this.#throwKeys(keys) && ['every','some'].some(es=>es===ES) && 0<keys.length ? keys[ES](k=>Object.prototype.hasOwnProperty.call(dict,k)) : false}

    // 不要だがnew Map()には存在するメンバー（clear(),size()以外は実装内容をそのまま書いたほうが短く済む）
    static delete(dict, key) {delete dict[key]}
    static clear(dict){this.keys(dict).map(k=>delete dict[k])}
    static get(dict, key){return dict[key]}
    static set(dict, key, value){dict[key]=value}
    static size(dict){return this.keys(dict).length}
    static forEach(dict, fn) {
        const ents = this.entries(dict);
        for (let i=0; i<ents.length; i++) { fn(ents[i][0],ents[i][1],i) }
    }
    // 実装する意義がない（Object.keys()が配列を返してしまうため、それをベースにyieldしてもメモリ消費が増えるだけで意味がない）
    // Map.prototype[Symbol.iterator]()
    // そもそも対象とする型が違う（groupBy()は表(table)型に対して行うものであってMap(Dict/Hash/連想配列)に対するものではない）
    // groupBy()

    // 欲しいけどnew Map()には未実装
    static isEmpty(dict){return 0===this.size(dict)}
    static isSame(...dicts) {return this.#isSame(false, ...dicts)}
    static isSameKey(...dicts) {return this.#isSame(true, ...dicts)}
    static #isSame(isKeyOnly=false, ...dicts) {
        if (dicts.length < 2){throw new TypeError(`Dict.isSame${isKeyOnly ? 'Key' : ''}は比較する二つ以上のDictが必要です。`)}
        const keys = this.keys(dicts[0])
        for (let i=1; i<dicts.length; i++) {
            if (keys.length !== this.keys(dicts[i]).length) {return false}
            if (!keys.every(k=>this.has(dicts[i], k))) {return false}
            if (!isKeyOnly && !keys.every(k=>dicts[i][k]===dicts[0][k])) {return false}
        }
        return true
    }
}
*/
window.Dict = Dict;
})();
