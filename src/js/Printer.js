zHeater["Printer"] = function Printer (require) {
    function _Printer(sandbox) {
        var self = this;

        this.sandbox = sandbox;
        this.box = this.sandbox.getBox();
        this.table = this.sandbox.dom.getById(this.sandbox.getResource("table"));
        this.link = this.sandbox.dom.getById(this.sandbox.getResource("printer_link"));
        this.tBody = this.table.tBodies[0];

        this.wrapImageElement = this.sandbox.dom.getById(this.sandbox.getResource("printer_left"));

        // обработчик клика
        // скроет модуль
        // возбуждает событие printer:hidden
        this.sandbox.dom.on(this.link, "click", function (e) {
            self.sandbox.event.stop(e);
            self.hide();
            self.sandbox.trigger("printer:hidden");
        });

        // добавить обработчик кнопки ESC
        self.sandbox.bind("common:keyup:esc", function(e) {
            if (self.isShown()) {
                self.hide();
            }
        });

        // подписывает модуль на результат вычислений
        this.sandbox.bind("calculate:ready", function(e) {

            // если нет tabindex то присвоить
            if (!self.box.getAttribute("tabindex")) {
                self.box.setAttribute("tabindex", "-1");
            }

            document.body.style.overflow = "hidden";

            var string = "";
            self.result = e.data;
            for (var key in e.data) {
                if (e.data.hasOwnProperty(key)) {
                    string += "<tr><td>" + key + "</td><td>" + e.data[key] + "</td></tr>";
                }
            }
            self.tBody.innerHTML = string;

            // как содержимое будет готово, отобразить и взять в фокус
            self.show();
            self.box.focus();
        });
    }

    /**
     * скрывает модуль
     */
    _Printer.prototype.hide = function () {
        this.box.style.display = "none";
        document.body.style.overflow = "";
    };

    /**
     * показывает модуль
     */
    _Printer.prototype.show = function () {
        this.box.style.display = "block";
    };

    /**
     * Возвращает true, если в момент вызова модуль показан
     *
     * @return {boolean}
     */
    _Printer.prototype.isShown = function () {
        return this.box.style.display === "block";
    };

    return _Printer;
};