//
// Основные модули приложения
//

var zHeater = {};
//= core.js
//= EventManager.js
//= Sandbox.js
//= descriptor.js
//= descriptors.js
//= Common.js
//= Calculator.js
//= Form.js
//= Printer.js
//= Helper.js

// startup
// вызов func(a)(b)
// где а - объект с компонентами
//     b - функция с инициализацией ядра
(function (window, sandboxed_modules) {
    var modules = {},//объект хранит в себе инициилизированные модули
        initialized_modules = {},
        // задача require отдавать уже проинициализированный экземпляр
        require = function (moduleName) {
            var module = modules[moduleName],
                output;

            // если проинициализирован, то вернуть как есть
            if (initialized_modules[moduleName] && module) {
                return module;
            }

            output = {exports: {}};
            initialized_modules[moduleName] = 1;
            modules[moduleName] = output.exports;

            if (!module) {
                // если модуля нет, то найти в глобальной области. Например: jQuery
                module = window[moduleName];
            } else if (typeof module == "function") {
                module = module(sandboxed_modules[moduleName] ? null : require, output.exports, output) || output.exports;
            }
            return modules[moduleName] = module;
        };

    var _ = function (misc) {
        //инициализация приложения,перебор все свойств misc
        var outputs = {exports: {}};
        switch (typeof misc) {
            case "function":
                misc(require, outputs.exports, outputs);
                break;
            case "object":
                for (var moduleName in misc) {
                    initialized_modules[moduleName] = 0;
                    modules[moduleName] = misc[moduleName];
                }
                break;
        }
        return _;
    };

    return _;
})(window, {"moduleName":true})(zHeater)(function (require, exports, module) {
    require("Core").init();
}); // в качестве параметра передать ядро приложения
