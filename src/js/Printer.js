//TODO при наведении на переменные рисунка выводить их значения
zHeater["Printer"] = function Printer (require) {
    function _Printer(sandbox) {
        var self = this;

        this.sandbox = sandbox;
        this.box = this.sandbox.getBox();
        this.table = this.sandbox.dom.getById(this.sandbox.getResource("table"));
        this.tBody = this.table.tBodies[0];

        this.wrapImageElement = this.sandbox.dom.getById(this.sandbox.getResource("printer_left"));

        //this.sandbox.dom.on(this.wrapImageElement, "mousemove", function (e) {
        //    //TODO не корректные координаты, выполнить на канвасе!
        //    var x = e.pageX,
        //        y = e.pageY;
        //    if ((x > 235 && x < 275) && (y > 15 && y < 40)) {
        //        alert (self.result["D"]);
        //    } else if ((x > 175 && x < 223) && (y > 116 && y < 138)) {
        //        alert (self.result["gap"]);
        //    } else if ((x > 296 && x < 325) && (y > 127 && y < 152)) {
        //        alert (self.result["q"]);
        //    } else if ((x > 12 && x < 40) && (y > 40 && y < 227)) {
        //        alert (self.result["i"]);
        //    } else if ((x > 119 && x < 140) && (y > 218 && y < 241)) {
        //        alert (self.result["S"]);
        //    } else if ((x > 396 && x < 425) && (y > 161 && y < 181)) {
        //        alert (self.result["L"]);
        //    } else if ((x > 364 && x < 400) && (y > 218 && y < 260)) {
        //        alert (self.result["hm"]);
        //    } else if ((x > 105 && x < 136) && (y > 347 && y < 365)) {
        //        alert (self.result["h"]);
        //    } else if ((x > 178 && x < 235) && (y > 431 && y < 470)) {
        //        alert (self.result["Vf"]);
        //    } else if ((x > 115 && x < 147) && (y > 477 && y < 500)) {
        //        alert (self.result["Tk"]);
        //    } else if ((x > 248 && x < 265) && (y > 500 && y < 515)) {
        //        alert (self.result["d"]);
        //    } else if ((x > 386 && x < 430) && (y > 440 && y < 480)) {
        //        alert (self.result["Hf"]);
        //    } else if ((x > 437 && x < 475) && (y > 427 && y < 475)) {
        //        alert (self.result["Hm"]);
        //    } else if ((x > 487 && x < 520) && (y > 395 && y < 420)) {
        //        alert (self.result["H"]);
        //    } else if ((x > 118 && x < 140) && (y > 535 && y < 560)) {
        //        alert (self.result["C"]);
        //    } else if ((x > 296 && x < 325) && (y > 543 && y < 570)) {
        //        alert (self.result["Tb"]);
        //    } else if ((x > 361 && x < 400) && (y > 545 && y < 585)) {
        //        alert (self.result["ha"]);
        //    } else if ((x > 30 && x < 70) && (y > 265 && y < 315)) {
        //        alert (self.result["Dout"]);
        //    } else {
        //        // скрыть показ всплывающего окна
        //    }
        //    console.log(x, y);
        //});

        this.sandbox.dom.on(this.box, "click", function (e) {
            self.closeAndUnbind();
        });

        this.sandbox.dom.on(this.box, "keyup", function (e) {
            console.log("press");
        });


        this.sandbox.bind("calculate:ready", function(e) {

            // при показе убрать фокус с формы
            self.box.focus();

            self.sandbox.bind("common:esc-up", function(e) {
                self.closeAndUnbind();
            });

            document.body.style.overflow = "hidden";
            self.box.style.display = "block";
            var string = "";
            self.result = e.data;
            for (var key in e.data) {
                string += "<tr><td>" + key + "</td><td>" + e.data[key] + "</td></tr>";
            }
            self.tBody.innerHTML = string;
        });
    }

    _Printer.prototype.closeAndUnbind = function () {
        this.box.style.display = "none";
        document.body.style.overflow = "";
        this.sandbox.unbind("common:esc-up");
    };

    return _Printer;
};