zHeater["Common"] = function (require, exports, module) {
    var _Common = function (sandox) {
        var self = this;
        this.sandbox = sandox;
        this.box = document.body;

        this.sandbox.dom.on(this.box, "keyup", function (e) {
            var key = e.which;

            switch (key) {
                case self.KEYS.ESC:
                    self.sandbox.trigger("common:keyup:esc");
                    break;
                case self.KEYS.ENTER:
                    console.log("ENTER pressed");
                    e.preventDefault();
                    return false;
            }
        });

    };

    _Common.prototype.KEYS = {
        ESC: 27,
        ENTER: 13
    };

    return _Common;

};