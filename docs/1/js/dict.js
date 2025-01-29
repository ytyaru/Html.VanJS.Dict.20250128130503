;(function(){
class Dict {
    new(obj=null) {// {key:'value'}, [['key','value']], ['key','value','key2','val2']
        const propObj = this.#getPropObj(obj);
        return Object.create(null, propObj)
    }
    //#isObj(obj) {return null!==obj && undefined!==obj 'object'===typeof obj && '[object Object]'===obj.toString()}
    #isObj(obj) {return null!==obj && undefined!==obj && 'object'===typeof obj}
    #getPropObj(obj) {
        if (Array.isArray(obj) && obj.every(o=>Array.isArray(o))) {return this.#makePropObjFromArys(obj)}
        else if (Array.isArray(obj) && 0===(obj.length % 2)){return this.#makePropObjFromAry(obj)}
        else if (this.#isObj(obj)){return this.#makePropObjFromObj(obj)}
        else {return undefined}
    }
    #isStr(key){return 'string'===typeof key || key instanceof String;}
    #isStrs(keys){return Array.isArray(keys) ? keys.every(k=>this.#isStr(k)) : false}
    #throwKey(key){if(!this.#isStr(key)){throw new TypeError(`キーは文字列であるべきです。:${key}:${typeof key}`)}}
    #throwKeys(keys){if(!this.#isStrs(keys) || Array.isArray(keys) && 0===keys.length){throw new TypeError(`キー配列は配列型であるべきです。要素が一つ以上あるべきです。要素であるキーは文字列であるべきです。:${keys}`)}}
    #makePropObjFromArys(arys) {return arys.reduce((obj,[k,v])=>{this.#throwKey(k);return Object.assign(obj,{[k]:{value:v}})}, Object.create(null))}
    #makePropObjFromAry(ary) {
        const obj = Object.create(null);
        for (let i=0; i<ary.length; i+=2) { this.#throwKey(ary[i]); obj[ary[i]] = {value:ary[i+1]}; }
        return obj;
    }
    #makePropObjFromObj(inObj) {
        const keys = Object.getOwnPropertyNames(inObj)
        keys.every(k=>this.#throwKey(k))
        return keys.reduce((obj,k)=>Object.assign(obj,{[k]:{value:inObj[k]}}), Object.create(null))
    }
    has(dict, key) {return !this.#throwKey(key) && Object.prototype.hasOwnProperty.call(dict, key)}
    keys(dict){return Object.getOwnPropertyNames(dict)}// 勝手に文字列順でソートされる？
    values(dict){return this.keys(dict).map(k=>dict[k])}
    entries(dict){return this.keys(dict).map(k=>[k, dict[k]])}
    //hasEvery(dict, keys){return this.#hasES(dict, keys, 'every')}
    //hasSome(dict, keys){return this.#hasES(dict, keys, 'some')}
    //#hasES(dict, keys, ES) {return !this.#throwKeys(keys) && ['every','some'].some(es=>es===ES) && 0<keys.length ? keys[ES](k=>Object.prototype.hasOwnProperty.call(dict,k)) : false}

    // 不要だがnew Map()には存在するメンバー
    delete(dict, key) {delete dict[key]}
    clear(dict){Dict.keys(dict).map(k=>delete dict[k])}
    get(dict, key){return dict[key]}
    set(dict, key, value){dict[key]=value}
    size(dict){return Dict.keys(dict).length}
    forEach(dict, fn) {
        const ents = Dict.entries(dict);
        for (let i=0; i<ents.length; i++) { fn(ents[0],ents[1],i) }
    }
    // 実装する意義がない（Object.keys()が配列を返してしまうため、それをベースにyieldしてもメモリ消費が増えるだけで意味がない）
    // Map.prototype[Symbol.iterator]()
    // そもそも対象とする型が違う（groupBy()は表(table)型に対して行うものであってMap(Dict/Hash/連想配列)に対するものではない）
    // groupBy()

    // 欲しいけどnew Map()には未実装
    isEmpty(dict){return 0===Dict.size(dict)}
    isSame(...dicts) {
        if (dicts.length < 2){throw new TypeError(`isSameは比較する二つ以上のDictが必要です。`)}
        const keys = Dict.keys(dict[0])
        const values = Dict.values(dict[0])
    }
    isSame(...dicts) {
        const keys = Dict.keys(dict[0])
        const vals = Dict.values(dict[0])
        for (let i=1; i<dicts.length; i++) {
            if (keys.length !== Dict.keys(dicts[i])) {return false}
            if (!keys.every(k=>Dict.has(dicts[i], k))) {return false}
            if (!vals.every(k=>Dict.has(dicts[i][k], vals[i]))) {return false}
        }
        return true
    }
    isSameKey(...dicts) {
        const keys = Dict.keys(dict[0])
        for (let i=1; i<dicts.length; i++) {
            if (keys.length !== Dict.keys(dicts[i])) {return false}
            if (!keys.every(k=>Dict.has(dicts[i], k))) {return false}
        }
    }
}
window.Dict = new Dict();
//window.Dict = Object.freeze(new Dict());
})();
