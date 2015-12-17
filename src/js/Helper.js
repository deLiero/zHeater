zHeater["Helper"] = function (require) {

    /**
     *
     * @param sandbox
     * @constructor
     */
    function _Helper (sandbox) {
        var self = this;

        this.sandbox = sandbox;

        this.box = this.sandbox.getBox();

        this.sandbox.bind("form:focus-d", function () {
            self.box.style.backgroundPosition = "-350px 0";
            self.box.style.backgroundSize = "";
        });

        this.sandbox.bind("form:focus-h", function () {
            self.box.style.backgroundPosition = "-100px -85px";
            self.box.style.backgroundSize = "384px";
        });

        this.sandbox.bind("form:focus-g", function () {
            self.box.style.backgroundPosition = "-350px -150px";
            self.box.style.backgroundSize = "";
        });

        this.sandbox.bind("form:focus-tk", function () {
            self.box.style.backgroundPosition = "-250px -650px";
            self.box.style.backgroundSize = "";
        });

        this.sandbox.trigger("helper:loaded", null);
    }

    return _Helper;
};