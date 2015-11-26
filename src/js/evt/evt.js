//
// модуль обеспечивает комуникацию между остальными модулями
//

zHeater.evt = (function () {

    var pool = {}; // содержит в себе обработчики событий системы

    //добавляет обработчик на событие
    function on(type, fn) {
        var _pool = pool[type];

        if(typeof fn !== "function") {
            console.warn("EVT module: CALLBACK is not FUNCTION", fn );
            return;
        }

        if (!_pool) {
            pool[type] = [];
            pool[type].push(fn);
        } else {
            _pool.push(fn);
        }
    }

    // удаляет событие type, либо обработчик события fn
    function remove(type, fn) {
        if (!type) {
            return;
        }

        if (!type && !fn) {
            return;
        }

        if (type && !fn) {
            delete pool[type];
            return;
        }

        if (type && fn) {
            var index = pool[type].indexOf(fn);
            if (index < 0) {
                return;
            }
            pool[type].slice(index, 1);
        }
    }

    // возбуждает событие type
    // объект события не создается
    // передаются только параметры в виде массива args
    function trigger(type, args) {
        var _pool = pool[type];
        if (!_pool) {
            return;
        }
        for (var i = 0, max = _pool.length; i < max; i++) {
            _pool[i].apply(_pool[i], args);
        }
    }

    return {
        on: on,
        remove: remove,
        trigger: trigger
    };
})();