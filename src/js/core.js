// core
function Core(require, exports) {
    var Sandbox      =  require("Sandbox"),
        EventManager =  require("EventManager");

    // привязывает context к function
    var bind = function (func, context) {
        return function () {
            return func.apply(context, arguments);
        }
    };

    // namespace

    var Core = {
        /**
         * объект для хранения описания модулей
         *
         * @type Object
         */
        descriptor: {},

        sandboxes: {},

        /**
         *
         * запуск приложения
         *
         * @param {Object} data
         *
         * @return {Core}
         */
        init: function (data) {
            data = data || {};
            this.descriptor = data.descriptor || require("modules");
            this.descriptor.modules = this.descriptor.modules || [];
            this.descriptor.layout = this.descriptor.layout || {};

            this._initModules();

            return this;
        },

        /**
         * @private
         */
        _initModules: function () {
            for (var i = 0, max = this.modules.length; i < max; i++) {
                this.initModule(this.modules[i]);
            }
        },

        /**
         * @param {String} name
         * @returns {Core}
         */
        initModule: function (name) {
            if (this.sandboxes[name]) {
                return this;
            }

            var sandbox = new Sandbox(name);
            var module = require(name);
            this.sandboxes[name] = sandbox;

            new module(sandbox);

            return this;
        },

        /**
         *
         * удаляет модуль
         *
         * @param name
         * @return {Core}
         */
        destroyModule: function (name) {
            var sandbox = this.sandboxes[name];

            if (sandbox) {
                EventManager.trigger("destroy", null, sandbox.namespace);

                //Cleanup
                EventManager.unbindAllNs(sandbox.namespace);
                var box = this.getBox(name);
                if (box) {
                    box.innerHTML = "";
                }

                delete  this.sandboxes[name];
            }

            return this;
        },

        /**
         *
         * получает DOM элемент модуля
         *
         * @param name
         * @return {HTMLElement|null}
         */
        getBox: function (name) {
            var elementId = this.descriptor.layout[name];
            if (elementId) {
                return document.getElementById(elementId);
            }
            return null;
        }
    };
}
