;(function(){
class Dict {
    new(obj=null, parent=null) {// {key:'value'}, [['key','value']], ['key','value','key2','val2']
        const propObj = this.#getPropObj(obj);
        return Object.create(parent, propObj)
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
    #throwKey(key){if(!this.#isStr(key)){throw new TypeError(`キーは文字列であるべきです。:${key}:${typeof key}`)}}
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
}
window.Dict = new Dict();
})();
