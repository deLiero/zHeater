"Form": function (require, exports, module) {

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

        this.sandbox.bind("calculate:ready", function(e) {
            alert(e.data);
        });

        // Обработчик формы
        // Генерирует событие form:ready, либо form:error
        // В качестве аргументов события form:ready передает введенные данные
        sandbox.dom.on(this.formElem, "submit", function (e) {
            sandbox.event.stop(e);
            try {
                var D = parseInt(self.inputs.diameter.value);
                var H = parseInt(self.inputs.height.value);
                var gap = parseFloat(self.inputs.gap.value);
                var Tk = parseFloat(self.inputs.thickness.value);

                // проверка на валидность данных
                console.log(self.validate(D, H, gap, Tk));
                if (self.validate(D, H, gap, Tk)) {
                    self.sandbox.trigger("form:ready", {d: D, h: H, g: gap, tk: Tk});
                } else {
                    self.sandbox.trigger("form:validate");
                }
            } catch (err) {
                console.error(err);
                self.sandbox.trigger("form:error", err);
            }
        });
    }

    /**
     * @param d     внутренний диаметр корпуса
     * @param h     высота корпуса
     * @param g     зазор между трубой и воротником
     * @param tk    толщина листа корпуса
     * @return {boolean}
     */
    Form.prototype.validate = function (d, h, g, tk) {
        return !(isNaN(d) || isNaN(h) || isNaN(g) || isNaN(tk));
    };

    return Form;
}