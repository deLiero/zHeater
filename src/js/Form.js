"Form": function (require, exports, module) {


    function form(sandbox) {
        var self = this;
        this.sandbox = sandbox;

        this.formElem = sandbox.getBox();

        if (!form) {
            return;
        }

        var self = this;

        this.inputs = {};

        this.inputs.diameter = sandbox.dom.getById("D");
        this.inputs.height = sandbox.dom.getById("H");
        this.inputs.gap = sandbox.dom.getById("gap");
        this.inputs.thickness = sandbox.dom.getById("Tk");

        this.sandbox.bind("calculate:ready", function(e) {
            alert(e.data);
        });

        //
        // Обработчик формы
        // Генерирует событие form-ready
        // В качестве аргументов события передает введенные данные
        //
        sandbox.dom.on(this.formElem, "submit", function (e) {
            sandbox.event.stop(e);
            try {
                var D = parseInt(self.inputs.diameter.value);
                var H = parseInt(self.inputs.height.value);
                var gap = parseFloat(self.inputs.gap.value);
                var Tk = parseFloat(self.inputs.thickness.value);

                // проверка на валидность данных
                if (isNaN(D) || isNaN(H) || isNaN(gap) || isNaN(Tk)) {
                    alert("НЕ КОРРЕКТНЫЕ ДАННЫЕ!\n\n"
                    + "Вн. диаметр: " + D +";\n" + "Высота заготовки: "
                    + H +";\n" + "Зазор: "
                    + gap +";\n" + "Толщина заготовки: "
                    + Tk +";\n");
                } else {
                    alert("ДАННЫЕ!\n\n"
                    + "Вн. диаметр: " + D +";\n" + "Высота заготовки: "
                    + H +";\n" + "Зазор: "
                    + gap +";\n" + "Толщина заготовки: "
                    + Tk +";\n");
                    self.sandbox.trigger("form:ready", {d: D, h: H, g: gap, tk: Tk});
                }
            } catch (err) {
                console.error(err);
            }
        });
    }

    return form;
}