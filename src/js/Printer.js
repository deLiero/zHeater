//TODO при наведении на переменные рисунка выводить их значения
"Printer": function Printer (require) {
    function _Printer(sandbox) {
        var self = this;

        this.sandbox = sandbox;
        this.box = this.sandbox.getBox();
        this.table = this.sandbox.dom.getById(this.sandbox.getResource("table"));
        this.tBody = this.table.tBodies[0];

        this.sandbox.dom.on(this.box, "click", function (e) {
            self.box.style.display = "none";
        });

        this.sandbox.bind("calculate:ready", function(e) {
            self.box.style.display = "block";
            var string = "";
            for (var key in e.data) {
                string += "<tr><td>" + key + "</td><td>" + e.data[key] + "</td></tr>";
            }
            self.tBody.innerHTML = string;
        });
    }

    return _Printer;
}