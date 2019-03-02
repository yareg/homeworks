const Store = {
    store: new Map(),
    getInstance() {
        return this
    },
    isMemoized(key, params) {
        const functionData = this._getDataByKey(key) || {};
        return functionData.hasOwnProperty(this._transformParams(params));
    },
    memoize(key, params, value) {
        const paramsKey = this._transformParams(params);
        let functionCachedData = this._readDataByFunction(key) || {};

        functionCachedData[paramsKey] = value;
        this.store.set(key, functionCachedData);
    },
    readMemoized(key, params) {
        const value = this._getDataByKey(key);
        if (!value) {
            return null;
        }
        const paramsKey = this._transformParams(params);
        if (value.hasOwnProperty(paramsKey)) {
            return value[paramsKey];
        }
        return null;
    },
    _readDataByFunction(funct) {
        return this._getDataByKey(funct);
    },
    _getDataByKey(key) {
        return this.store.get(key);
    },
    _transformParams(params) {
        return JSON.stringify(params);
    }
};

function memoization(func) {
    let cache = Store.getInstance();

    return function (...params) {
        if (cache.isMemoized(func.name, params)) {
            const value = cache.readMemoized(func.name, params);
            console.log(`Read from cache ${func.name}:`);
            console.log(params);
            console.log(value);

            return value
        }
        else {
            let result = func.apply(null, params);

            console.log(`Set ${func.name}:`);
            console.log(params);
            console.log(result);
            cache.memoize(func.name, params, result);
        }
    }
}

function multiply(x, y) {
    return x * y;
}

function sum(x, y) {
    return x + y;
}

memoization(multiply)(2, 3);

memoization(sum)(1, 4);

memoization(multiply)(2, 3);

memoization(sum)(1, 4);

memoization(sum)(1, 6);

memoization(sum)(1, 4);