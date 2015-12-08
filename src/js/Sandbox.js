function Sandbox (require) {
    var Core = require("Core"),
        EventManager = require("EventManager");

    var uuid = 0;

    /**
     * @constructor
     * @param {Object} descriptor
     */
    var Sandbox = function (descriptor) {
        this.descriptor = descriptor || {};
        this.namespace = this.descriptor.name + ++uuid;
    };

    /**
     *
     * Возвращает HTMLElement модуля
     *
     * @return {HTMLElement|null}
     */
    Sandbox.prototype.getBox = function () {
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

    // exports
    return Sandbox;
}