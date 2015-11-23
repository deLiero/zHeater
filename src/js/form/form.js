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
            var D = parseFloat(self.inputs.diameter.value);
            alert(typeof D + " " + D);
            //e.preventDefault();
            return false;
        };
    }

    return form;
})();