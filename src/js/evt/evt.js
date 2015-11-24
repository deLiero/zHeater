//
// модуль обеспечивает комуникацию между остальными модулями
//

zHeater.evt = {};

// содержит в себе обработчики событий системы
zHeater.evt.pool = {};

// возбуждает событие type
// объект события не создается
// передаются только параметры в виде массива args
zHeater.evt.trigger = function(type, args) {
    var _pool = zHeater.evt.pool[type];
    if (!_pool) {
        return;
    }
    for (var i = 0, max = _pool.length; i < max; i++) {
        _pool[i].apply(_pool[i], args);
    }
};

//добавляет обработчик на событие
zHeater.evt.add = function (type, fn) {
    var _pool = zHeater.evt.pool[type];

    if (!_pool) {
        zHeater.evt.pool[type] = [];
        zHeater.evt.pool[type].push(fn);
    } else {
        _pool.push(fn);
    }
};

// удаляет событие type, либо обработчик события fn
zHeater.evt.remove = function(type, fn) {
    if (!type) {
        return;
    }

    if (!type && !fn) {
        return;
    }

    if (type && !fn) {
        delete zHeater.evt.pool[type];
        return;
    }

    if (type && fn) {
        var index = zHeater.evt.pool[type].indexOf(fn);
        if (index < 0) {
            return;
        }
        zHeater.evt.pool[type].slice(index, 1);
    }
};