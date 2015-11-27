zHeater.Printer = (function () {
    function Printer(canvas) {
        var self = this;

        zHeater.evt.on("calculate-ready", function(result) {
            alert(result);
        })
    }

    return Printer;
})();