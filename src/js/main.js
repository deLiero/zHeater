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

    //TODO delete window._m, window._r
    window._m = modules;
    window._r = require;

    return _;
})(window, {"moduleName":true})({
    //= core.js
    //= EventManager.js
    //= Sandbox.js
    "descriptor": {
        "modules": ["Form", "Calculator", "Printer"],
        "layout": {
            "Form": "form",
            "Printer": "printer"
        }
    },
    "descriptors": {
        "Form": {name: "Form", resources: {inputs: {diameter: "D", height: "H", gap: "gap", thickness: "Tk"}}},
        "Calculator": {name: "Calculator"},
        "Printer": {"name": "Printer", "resources": {"table": "table"}}
    },
    //= Calculator.js
    //= Form.js
    //= Printer.js
})(function (require, exports, module) {
    require("Core").init();
}); // в качестве параметра передать ядро приложения
