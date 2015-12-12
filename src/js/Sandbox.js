//TODO проблемма с Core
"Sandbox": function (require) {
    var Core = require("Core"), // тут коре пустой объект потому что первый вызов require в Core не завершился
        EventManager = require("EventManager"); // корректный

    var uuid = 0;

    /**
     * @constructor
     * @param {Object} descriptor
     */
    var Sandbox = function (descriptor) {
        this.descriptor = descriptor || {};
        console.log(3);
        // если не добавить "" то при discriptor.name = undefined будет NaN
        this.namespace = this.descriptor.name + "" + (++uuid);
    };

    /**
     *
     * Возвращает контейнер модуля
     *
     * @return {HTMLElement|null}
     */
    Sandbox.prototype.getBox = function () {
       // а тут коре таким каким он должен быть, потому что первый вызоз require завершился
        return Core.getBox(this.descriptor.name);
    };

    /**
     *
     * подписывает модуль на определённое событие
     *
     * @param {String}   event
     * @param {Function} callback
     *
     * @return {Sandbox}
     */
    Sandbox.prototype.bind = function (event, callback) {
        EventManager.bind(event, callback, this.namespace);
        return this;
    };

    /**
     *
     * отписывается от определённого события
     *
     * @param {String}   event
     * @param {Function} callback
     * @return {Sandbox}
     */
    Sandbox.prototype.unbind = function (event, callback) {
        EventManager.unbind(event, callback, this.namespace);
        return this;
    };

    /**
     *
     * Возбуждает событие и передаёт данные
     *
     * @param {String} event
     * @param          data
     * @return {Sandbox}
     */
    Sandbox.prototype.trigger = function (event, data) {
        EventManager.trigger(event, data);
        return this;
    };

    //TODO задокументировать
    Sandbox.prototype.dom = {};

    Sandbox.prototype.dom.getById = function (id) {
        return Core.dom.getById(id);
    };

    Sandbox.prototype.dom.on = function (elem, event, callback) {
        Core.dom.on(elem, event, callback);
    };

    Sandbox.prototype.event = {};

    Sandbox.prototype.event.stop = function (e) {
        Core.event.stop(e);
    };

    // exports
    return Sandbox;
},