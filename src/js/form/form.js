zHeater.Form = (function () {
    function form() {

        var form = document.getElementById("form") || document.getElementsByClassName("form_")[0];

        if (!form) {
            return;
        }

        var self = this;

        this.inputs = {};

        this.inputs.diameter = document.getElementById("D");
        this.inputs.height = document.getElementById("H");
        this.inputs.gap = document.getElementById("gap");
        this.inputs.thickness = document.getElementById("Tk");

        form.onsubmit = function (e) {
            //e.preventDefault();
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
                zHeater.evt.trigger("form-ready", [D, H, gap, Tk]);
            }
            return false;
        };
    }

    return form;
})();