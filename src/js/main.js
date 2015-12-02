// startup
(function (window, sanboxed_modules) {
    var modules = {},//объект хранит в себе инициилизированные модули
        require = function (moduleName) {
            if (!moduleName) {
                return;
            }
            return modules[moduleName];
        };

    var _ = function (misc) {
        //инициализация приложения,перебор все свойств misc
        // задача require отдавать уже проинициализированный экземпляр
        var outputs = {exports: {}};

        for (var key in misc) {
            switch (typeof misc) {
                case "function":
                    misc(require, outputs.exports, outputs);
                    break;
                case "object":
                    if (misc.hasOwnProperty(key)) {
                        modules[key] = misc[key](require);
                    }
                    break;
            }
        }
        return _;
    };

    return _;
})(window, {"moduleName":true})({
    "Core": function(require) {

    },
    "Sandbox": function(require) {

    }
})(); // в качестве параметра передать ядро приложения
