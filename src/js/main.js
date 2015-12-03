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

            //TODO if module == string => eval(module) in global scope (Indirect eval call);

            output = {exports: {}};
            initialized_modules[moduleName] = 1;
            modules[moduleName] = output.exports;

            if(!module) {
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
                    console.log(typeof misc[moduleName]);
                    initialized_modules[moduleName] = 0;
                    modules[moduleName] = misc[moduleName];
                }
                break;
        }
        console.log(modules);
        return _;
    };
    return _;
})(window, {"moduleName":true})({
    "Core": function Core(require, exports) {
        console.log("core", exports);
        var Sandbox = require("Sandbox");

        var _exports = {
            getSandbox: function () {
                return new Sandbox();
            },
            init: function () {
                alert("HW");
                //return this;
            }
        };

        for (var i in _exports) {
            exports[i] = _exports[i];
        }
    },
    "Sandbox": function(require) {

    }
})(function (require, exports, module) {
    console.log(require("Core"));
    require("Core").init();
}); // в качестве параметра передать ядро приложения
