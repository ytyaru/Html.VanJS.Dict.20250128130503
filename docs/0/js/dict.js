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
    //#throwKeys(keys){if(!this.#isStrs(keys) || Array.isArray(keys) && 0===keys.length){throw new TypeError(`キー配列は要素が一つ以上あるべきです。キーは文字列であるべきです。:${keys}:${keys.map(k=>typeof k)}`)}}
//    #throwKeys(keys){if(!this.#isStrs(keys) || Array.isArray(keys) && 0===keys.length){throw new TypeError(`キー配列は要素が一つ以上あるべきです。キーは文字列であるべきです。:${keys}:${Array.isArray(keys) ? keys.map(k=>typeof k).join('\n') : typeof keys}`)}}
//    #throwKeys(keys){if(!this.#isStrs(keys) || Array.isArray(keys) && 0===keys.length){throw new TypeError(`キー配列は配列型であるべきです。要素が一つ以上あるべきです。要素であるキーは文字列であるべきです。:${keys}:${Array.isArray(keys) ? keys.map(k=>typeof k) : typeof keys}`)}}
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
//    has(dict, key) {return this.#isStr(key) && Object.prototype.hasOwnProperty.call(dict, key)}
//    has(dict, key) {return Object.prototype.hasOwnProperty.call(dict, key)}
    /*
    has(dict, key) {
        if (this.#isStr(key)) {return Object.prototype.hasOwnProperty.call(dict, key)}
        else if (this.#isStrs(key) && 0<key.length) {return key.every(k=>Object.prototype.hasOwnProperty.call(dict,k))}
        else {throw new TypeError(`Dict.includes()の第二引数は所持が期待されるキーかその配列であるべきです。キーは文字列であるべきです。配列なら要素は一つ以上あるべきです。:${keys}`)}
    }
    */
    keys(dict){return Object.getOwnPropertyNames(dict)}
    values(dict){return this.keys(dict).map(k=>dict[k])}
    entries(dict){return this.keys(dict).map(k=>[k, dict[k]])}
    //hasEvery(dict, keys){return this.#isStrs(keys) && 0<keys.length ? keys.every(k=>Object.prototype.hasOwnProperty.call(dict,k)) : false}
    hasEvery(dict, keys){return this.#hasES(dict, keys, 'every')}
    hasSome(dict, keys){return this.#hasES(dict, keys, 'some')}
    #hasES(dict, keys, ES) {return !this.#throwKeys(keys) && ['every','some'].some(es=>es===ES) && 0<keys.length ? keys[ES](k=>Object.prototype.hasOwnProperty.call(dict,k)) : false}
    //#hasES(dict, keys, ES) {return this.#isStrs(keys) && ['every','some'].some(es=>es===ES) && 0<keys.length ? keys[ES](k=>Object.prototype.hasOwnProperty.call(dict,k)) : false}
//    includes(dict, keys){return Array.isArray(keys) ? keys.every(k=>Dict.has(dict,k)) : (()=>{throw new TypeError(`Dict.includes()の第二引数は所持が期待されるキー配列であるべきです。:${keys}`)})()}
    /*
    has(dict, key) {return key in dict}
    hasOwn(dict, key) {return Object.prototype.hasOwnProperty.call(dict, key)}
    ownKeys(dict){return Object.getOwnPropertyNames(dict)}
    keys(dict=Object.create(null), result=[]) {
        const keys = Object.getOwnPropertyNames(dict)
        result = [...result, ...keys]
        const prototype = Object.getPrototypeOf(dict)
        return prototype ? getAllProperties(prototype, result) : result
    }
    ownValues(dict) {return this.ownKeys(dict).map(k=>dict[k])}
    values(dict){return this.keys(dict).map(k=>dict[k])}
    ownEntries(dict){return this.ownKeys(dict).map(k=>[k, dict[k]])}
    entries(dict){return this.keys(dict).map(k=>[k, dict[k]])}
    */
}
window.Dict = new Dict();
})();
