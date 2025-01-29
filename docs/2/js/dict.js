;(function(){
class Dict {
    static new(obj=null) {// {key:'value'}, [['key','value']], ['key','value','key2','val2']
        const propObj = this.#getPropObj(obj);
        return Object.create(null, propObj)
    }
    //#isObj(obj) {return null!==obj && undefined!==obj 'object'===typeof obj && '[object Object]'===obj.toString()}
    static #isObj(obj) {return null!==obj && undefined!==obj && 'object'===typeof obj}
    static #getPropObj(obj) {
        if (Array.isArray(obj) && obj.every(o=>Array.isArray(o))) {return this.#makePropObjFromArys(obj)}
        else if (Array.isArray(obj) && 0===(obj.length % 2)){return this.#makePropObjFromAry(obj)}
        else if (this.#isObj(obj)){return this.#makePropObjFromObj(obj)}
        //else {return undefined}
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
    //keys(dict){return Object.getOwnPropertyNames(dict)}// 勝手に文字列順でソートされる？
    static keys(dict){return [...Object.keys(dict)]}// 勝手に文字列順でソートされる？
    static values(dict){return this.keys(dict).map(k=>dict[k])}
    static entries(dict){return this.keys(dict).map(k=>[k, dict[k]])}
    // あったほうが便利かも？
    static hasEvery(dict, keys){return this.#hasES(dict, keys, 'every')}
    static hasSome(dict, keys){return this.#hasES(dict, keys, 'some')}
    static #hasES(dict, keys, ES) {return !this.#throwKeys(keys) && ['every','some'].some(es=>es===ES) && 0<keys.length ? keys[ES](k=>Object.prototype.hasOwnProperty.call(dict,k)) : false}

    // 不要だがnew Map()には存在するメンバー
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
    /*
    static isSame(...dicts) {
        if (dicts.length < 2){throw new TypeError(`Dict.isSameは比較する二つ以上のDictが必要です。`)}
        const keys = this.keys(dicts[0])
        for (let i=1; i<dicts.length; i++) {
            if (keys.length !== this.keys(dicts[i]).length) {console.log('1');return false}
            if (!keys.every(k=>this.has(dicts[i], k))) {console.log('2');return false}
            if (!keys.every(k=>dicts[i][k]===dicts[0][k])) {console.log('3');return false}
        }
        return true
    }
    static isSameKey(...dicts) {
        if (dicts.length < 2){throw new TypeError(`Dict.isSameは比較する二つ以上のDictが必要です。`)}
        const keys = this.keys(dict[0])
        for (let i=1; i<dicts.length; i++) {
            if (keys.length !== this.keys(dicts[i])) {return false}
            if (!keys.every(k=>this.has(dicts[i], k))) {return false}
        }
    }
    */
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
window.Dict = Dict;
//window.this = new this();
//window.this = Object.freeze(new this());
})();
