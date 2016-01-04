zHeater["Form"] = function (require, exports, module) {

    /**
     * @param sandbox
     * @constructor
     */
    function Form(sandbox) {
        var self = this;
        this.sandbox = sandbox;
        this.formElem = sandbox.getBox();

        this.inputs = {};

        var inputs = this.sandbox.getResource("inputs");

        this.inputs.diameter = sandbox.dom.getById(inputs.diameter);
        this.inputs.height = sandbox.dom.getById(inputs.height);
        this.inputs.gap = sandbox.dom.getById(inputs.gap);
        this.inputs.thickness = sandbox.dom.getById(inputs.thickness);

        //
        // проверка ввода данных
        //
        sandbox.dom.on(this.inputs.diameter, "input", function (e) {
            self.inputs.diameter.value = self.correctInput(self.inputs.diameter.value, "int");
            if (self.checkInput(self.inputs.diameter.value,"int")) {
                self.restore("diameter");
            }
        });

        sandbox.dom.on(this.inputs.height, "input", function (e) {
            self.inputs.height.value = self.correctInput(self.inputs.height.value, "int");
            if (self.checkInput(self.inputs.height.value,"int")) {
                self.restore("height");
            }
        });

        sandbox.dom.on(this.inputs.gap, "input", function (e) {
            self.inputs.gap.value = self.correctInput(self.inputs.gap.value, "float");
            if (self.checkInput(self.inputs.gap.value,"float")) {
                self.restore("gap");
            }
        });

        sandbox.dom.on(this.inputs.thickness, "input", function (e) {
            self.inputs.thickness.value = self.correctInput(self.inputs.thickness.value, "float");
            if (self.checkInput(self.inputs.thickness.value,"float")) {
                self.restore("thickness");
            }
        });

        //
        // при фокусе инициировать событие
        //
        sandbox.dom.on(this.inputs.diameter, "focus", function (e) {
            self.sandbox.trigger("form:focus-d");
        });

        sandbox.dom.on(this.inputs.height, "focus", function (e) {
            self.sandbox.trigger("form:focus-h");
        });

        sandbox.dom.on(this.inputs.gap, "focus", function (e) {
            self.sandbox.trigger("form:focus-g");
        });

        sandbox.dom.on(this.inputs.thickness, "focus", function (e) {
            self.sandbox.trigger("form:focus-tk");
        });

        // как только модуль Helper загружен, взять в фокус поле diameter
        sandbox.bind("helper:loaded", function () {
            self.inputs.diameter.focus();
            self.sandbox.trigger("form:focus-d");
        });

        // Обработчик формы
        // Генерирует событие form:ready, либо form:error
        // В качестве аргументов события form:ready передает введенные данные
        sandbox.dom.on(this.formElem, "submit", function (e) {
            try {
                var D = parseInt(self.inputs.diameter.value);
                var H = parseInt(self.inputs.height.value);
                var gap = parseFloat(self.inputs.gap.value);
                var Tk = parseFloat(self.inputs.thickness.value);

                // проверка на валидность данных
                if (self.validate(D, H, gap, Tk)) {
                    self.sandbox.trigger("form:ready", {d: D, h: H, g: gap, tk: Tk});
                } else if (!self.checkInput(self.inputs.diameter.value, "int")) {
                    self.highlightInput("diameter");
                }
                if (!self.checkInput(self.inputs.height.value, "int")) {
                    self.highlightInput("height");
                }
                if (!self.checkInput(self.inputs.gap.value, "float")) {
                    self.highlightInput("gap");
                }
                if (!self.checkInput(self.inputs.thickness.value, "float")) {
                    self.highlightInput("thickness");
                }
                self.sandbox.trigger("form:validateError");
            } catch (err) {
                console.log("try/catch");
                console.error(err);
                self.sandbox.trigger("form:error", err);
            }
            sandbox.event.stop(e);
        });
    }

    /**
     * @param  {Number}  d     внутренний диаметр корпуса
     * @param  {Number}  h     высота корпуса
     * @param  {Number}  g     зазор между трубой и воротником
     * @param  {Number}  tk    толщина листа корпуса
     * @return {boolean}
     */
    Form.prototype.validate = function (d, h, g, tk) {
        return !(isNaN(d) || isNaN(h) || isNaN(g) || isNaN(tk));
    };

    /**
     * корректирует ввод пользователя
     *
     * @param {String}  value
     * @param {String}  type
     * @return {String}
     */
    Form.prototype.correctInput = function (value, type) {
        switch (type) {
            case "int":
                return value.replace(/[^0-9]/g, "");
                break;
            case "float":
                value = value.replace(",", ".");
                return value.replace(/[^0-9\.]/g, "");
                break;
            default :
                return value;
        }
    };

    /**
     * проверяет ввод данных
     *
     * @param {String}               value  проверяемое значение
     * @param {String|"int"|"float"} type   тип проверки
     * @return {boolean|null}
     */
    Form.prototype.checkInput = function (value, type) {
        switch (type) {
            case "int":
                return (/^[0-9]+$/).test(value);
                break;
            case "float":
                return (/^[0-9]+(\.([0-9])*)?$/).test(value);
                break;
            default :
                return null;
        }
    };

    /**
     * подсвечивает границу поля с именемен name
     *
     * @param {String} name
     * return {undefined}
     */
    Form.prototype.highlightInput = function (name) {
        if (name && this.inputs[name]) {
            this.inputs[name].style.borderColor = "#e74c3c";
        }
    };

    /**
     * восстанавливает цвет границы поля с именем name
     *
     * @param {String}  name
     * return {undefined}
     */
    Form.prototype.restore = function (name) {
        if (!name) {
            for (var key in this.inputs) {
                this.inputs[key].style.borderColor = "";
            }
            return;
        }

        if(this.inputs[name]) {
            this.inputs[name].style.borderColor = "";
        }

    };

    return Form;
};