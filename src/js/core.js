// core
function Core(require, exports) {
    var Sandbox = require("Sandbox");

    var bind = function (func, context) {
        return function () {
            return func.apply(context, arguments);
        }
    };

    // namespace

    var Core = {
        init: function () {

        },

        _initModules: function () {

        },

        initModule: function () {

        },

        destroyModule: function () {

        }
    };
}
