//
// менеджер событий модулей системы
// взято с http://habrahabr.ru/post/123635/
// внес небольшие изменения под свои нужды
//

"EventManager": function EventManager(require) {

    /**
     * @namespace
     */
    return {
        /**
         * @type {Object}
         *
         * @format
         * {
         *      "evenName": {
         *          "namespace": [function, ...],
         *          ...
         *      }
         *      ...
         * }
         */
        eventsNs: {},

        /**
         * возвращает массив callbacks для выбранного eventNamespace или объект с namespace для выбранного eventName
         *
         * @param eventName
         * @param eventNamespace
         *
         * @example
         * _getEventListNs(eventName) ==> {"namespace1": [...], "namespace2": [...], ...}
         * _getEventListNs(eventName, eventNamespace) ==> [func1, func2, ...]
         *
         * @returns {Array|Object}
         */
        _getEventListNs: function (eventName, eventNamespace) {
            var self = this;
            if (!self.eventsNs[eventName]) {
                self.eventsNs[eventName] = {};
            }

            if (eventNamespace) {
                if (!self.eventsNs[eventName][eventNamespace]) {
                    self.eventsNs[eventName][eventNamespace] = [];
                }

                return self.eventsNs[eventName][eventNamespace];
            } else {
                return self.eventsNs[eventName];
            }

        },

        /**
         *
         * парсит строку событий
         *
         * @param events
         * @returns {Array}  массив событий
         */
        _parseEventsString: function (events) {
            var eventList = events.split(" "),
                result = [];

            for (var i = 0, max = eventList.length; i < max; i++) {
                if (eventList[i]) {
                    result.push(eventList[i]);
                }
            }

            return result;
        },

        /**
         *
         * запускает обработчики событий определенного пространства имен, либо все обработчики события
         *
         * @param events    строка списка событий
         * @param data      данные события
         * @param ns        пространство имен
         * @returns {EventManager}
         */
        trigger: function (events, data, ns) {
            console.log(ns);
            if (typeof events === "string") {
                events = this._parseEventsString(events);

                for (var i = 0, max = events.length, eventListNs, listOfCallbacks, eventName; i < max; i++) {
                    eventName = events[i];
                    eventListNs = this._getEventListNs(eventName); // {"namespace" : [callbacks, ...], ...}

                    for (var namespace in eventListNs) {
                        // если ns == undefined запустить все обработчики события
                        if (ns && ns !== namespace) {
                            continue;
                        }

                        if (eventListNs.hasOwnProperty(namespace)) {
                            listOfCallbacks = eventListNs[namespace];

                            for (var j = 0, max1 = listOfCallbacks.length, event; j < max1; j++) {
                                event = {type: [events[i]], data: data};
                                listOfCallbacks[j](event);
                            }
                        }
                    }
                }
            }
            return this;
        },

        /**
         *
         * добавляет обработчик на событие, соответтствующее пространству имён
         *
         * @param {String}      events
         * @param {Function}    callback
         * @param {String}      namespace
         * @returns {bind}
         */
        bind: function (events, callback, namespace) {
            if (typeof events === "string" && typeof callback === "function") {
                namespace = namespace || "*";
                events = this._parseEventsString(events);

                for (var i = 0, max = events.length; i < max; i++) {
                    this._getEventListNs(events[i], namespace).push(callback);
                }
            }
            return this;
        },

        /**
         *
         * @param {String}          events      events
         * @param {Function|String} callback    callback or namespace
         * @param {String}          namespace   namespace or undefined
         *
         * @example
         * unbind(event) удаляет все обработчки пространства имен '*'
         * unbind(event, function) удаляет один обработчик пространства имен '*'
         * unbind(event, namespace) удаляет все обработчики собитий соответствующие пространству имен
         * unbind(event, function, namespace) удаляет один обработчик событий соответствующие пространству имен
         *
         * @returns {EventManager}
         */
        unbind: function (events, callback, namespace) {
            if (typeof events === "string") {
                if (typeof callback === "string" && typeof namespace === "undefined") {
                    namespace = callback;
                    callback = void 0;
                }

                namespace = namespace || "*";
                events = this._parseEventsString(events);

                for (var i = 0, max = events.length, listOfCallbacks, callbackIndex; i < max; i++) {
                    listOfCallbacks = this._getEventListNs(events[i], namespace);
                    if (callback) {
                        callbackIndex = listOfCallbacks.indexOf(callback);
                        if (callbackIndex !== -1) {
                            listOfCallbacks.splice(callbackIndex, 1);
                        }
                    } else {
                        listOfCallbacks.splice(0); // wipe
                    }

                }
            }
            return this;
        },

        /**
         *
         * Отвязывает все обработчики событий выбранного пространства имён
         *
         * @param namespace
         * @return {EventManager}
         */
        unbindAllNs: function (namespace) {
            var eventListNs;
            for (var eventName in this.eventsNs) {
                if (this.eventsNs.hasOwnProperty(eventName)) {
                    eventListNs = this.eventsNs[eventName];
                    if (eventListNs[namespace]) {
                        eventListNs[namespace] = [];
                    }
                }
            }
            return this;
        }
    }
},