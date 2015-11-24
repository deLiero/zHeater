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
            e.preventDefault();
            var D = parseInt(self.inputs.diameter.value);
            var H = parseInt(self.inputs.height.value);
            var gap = parseFloat(self.inputs.gap.value);
            var Tk = parseFloat(self.inputs.thickness.value);
            var calc = new zHeater.Calc({D: D, H: H, gap: gap, Tk: Tk});
            console.log(calc.calculate());
            zHeater.evt.trigger("bla", [D, H, gap, Tk]);
            console.log(zHeater.evt);
            zHeater.evt.remove("bla1");
            console.log(zHeater.evt);
            return false;
        };
    }

    return form;
})();