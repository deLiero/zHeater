// core
"Core": function Core(require, exports) {
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
            this.descriptor = data.descriptor || require("descriptor");
            this.descriptor.modules = this.descriptor.modules || [];
            this.descriptor.layout = this.descriptor.layout || {};
            this.descriptors = data.descriptors || require("descriptors");

            this._initModules();

            return this;
        },

        /**
         * @private
         */
        _initModules: function () {
            for (var i = 0, max = this.descriptor.modules.length; i < max; i++) {
                this.initModule(this.descriptor.modules[i]);
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
            var sandbox = new Sandbox(this.descriptors[name]);
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
        },

        /**
         * объект с методами DOM
         *
         * @type Object]
         */
        dom: {
            /**
             *
             * возвращает елемент соответвующий id
             *
             * @param id
             * @return {HTMLElement|null}
             */
            getById: function (id) {
                if (id) {
                    return document.getElementById(id);
                } else {
                    return null;
                }
            },
            //TODO задокументировать
            on: function (elem, eventName, callback) {
                elem.addEventListener(eventName, callback, true);
            }
        },

        //TODO задокументировать
        event: {
            stop: function (e) {
                if (e.preventDefault) {
                    e.preventDefault();
                } else {
                    e.returnValue = false;
                }
            }
        }
    };

    var coreExports = {
        trigger:       bind(EventManager.trigger, EventManager),
        bind:          bind(EventManager.bind, EventManager),
        unbind:        bind(EventManager.bind, EventManager),
        unbindAllNs:   bind(EventManager.unbindAllNs, EventManager),

        init:          bind(Core.init, Core),
        destroyModule: bind(Core.destroyModule, Core),
        initModule:    bind(Core.initModule, Core),
        getBox:        bind(Core.getBox, Core),
    };

    coreExports.dom = Core.dom;
    coreExports.event = Core.event;

    //TODO delete coreExports._sb
    coreExports._sb = Core.sandboxes;

    for (var i in coreExports) {
        exports[i] = coreExports[i];
    }
},
