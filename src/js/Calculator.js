"Calculator": function Calculator(require, exports, module) {

    Number.prototype._z_roundTo = function (n) {
        n = parseInt(n);
        if (isNaN(n)) {
            return this;
        }
        n = Math.pow(10, n);
        return Math.round(this * n)/n;
    };

    var Calculator = function (sandbox, prop) {

        var self = this;
        this.sandbox = sandbox;

        prop = prop || {};
        this.D = prop.D || 0;      //внут. диаметр корпуса (input)
        this.H = prop.H || 0;      //высота корпуса (input)
        this.Tk = prop.Tk || 0;    //толщина листа корпуса (input)
        this.gap = prop.gap || 0;  //зазор между трубой и воротником ( не более 2,5мм) (input)

        var self = this;

        this.sandbox.bind("form:ready", function (e) {
            self.setup(e.data.d, e.data.h, e.data.g, e.data.tk);
            console.log(self.calculate());
        });
    };

    //private functions

    /**
     * высота воротника при опущенной трубе
     * @param L
     * @returns {number}
     * @private
     */
    function _q(L) {
        return L + 150;
    }

    /**
     * высота воротника
     * @param gap
     * @returns {number}
     * @private
     */
    function _L(gap) {
        return 80 * gap;
    }

    /**
     * диаметр трубы подачи воздуха
     * @param Dout
     * @returns {number}
     * @private
     */
    function _d(Dout) {
        return (0.5 * Dout)._z_roundTo(2);
    }

    /**
     * диаметр выходного патрубка воздуховода
     * @param S
     * @returns {number}
     * @private
     */
    function _Dout(S) {
        return (Math.sqrt(4*S/Math.PI)*10)._z_roundTo(2);
    }

    /**
     * площадь сечения выходного патрубка воздуховода
     * @param E
     * @returns {number}
     * @private
     */
    function _S(E) {
        return (1.75 * E)._z_roundTo(2);
    }

    /**
     * удельная теплоотдача конкретного вида топлива
     * @param M
     * @param e
     * @returns {number}
     * @private
     */
    function _E(M, e) {
        return (M * e)._z_roundTo(2);
    }

    /**
     * Масса закладки топлива
     * @param Vf
     * @param mf
     * @returns {number}
     * @private
     */
    function _M(Vf, mf) {
        return (Vf * mf)._z_roundTo(2);
    }

    /**
     * объем топливного отсека печки
     * @param D
     * @param Hf
     * @returns {number}
     * @private
     */
    function _Vf(D, Hf) {
        D = D/100;
        Hf = Hf/100;
        return (Math.PI*D*D*Hf/4)._z_roundTo(2);
    }

    /**
     * высота загрузки камеры
     * @param H
     * @returns {number}
     * @private
     */
    function _Hf(H) {
        return (2*H/3)._z_roundTo(2);
    }

    /**
     * удельный коэффициент закладки кг/дм^3
     * @returns {number}
     * @private
     */
    function _mf() {
        return 0.4;
    }

    /**
     * удельная теплоотдача кВт/ч
     * @returns {number}
     * @private
     */
    function _e() {
        return 5.59;
    }

    /**
     * зазор между диском и корпусом
     * @param D
     * @returns {number}
     * @private
     */
    function _C(D) {
        return (0.05 * D)._z_roundTo(2);
    }

    /**
     * высота рёбер воздуховодов
     * @param D
     * @returns {number}
     */
    function _h(D) {
        if (300 <= D < 400) {
            return 40;
        }

        if (400 <= D < 600) {
            return 50;
        }

        if (600 <= D < 800) {
            return 60;
        }

        if (D >= 800) {
            return 80;
        }
    }

    /**
     * подбор толщины блина
     * @param D
     * @returns {number}
     */
    function _Tb(D) {
        if (D <= 300 || D < 400) {
            return 8;
        }

        if (D <= 400 || D < 800) {
            return 6;
        }

        if (D <= 600 || D < 800) {
            return 4;
        }

        if (D >= 800) {
            return 2.5;
        }
    }

    var p = Calculator.prototype;

    /**
     * Выполняет расчет
     * Генерирует событие calculate-ready
     * @returns {Object}
     */
    p.calculate = function () {7
        var result = {};

        result.D = this.D;
        result.H = this.H;
        result.Tk = this.Tk;
        result.gap = this.gap;
        result.C = _C(this.D);
        result.Tb = _Tb(this.D);
        result.h = _h(this.D);
        result.Hf = _Hf(this.H);
        result.Vf = _Vf(this.D, result.Hf);
        result.M = _M(result.Vf, _mf());
        result.E = _E(result.M, _e());
        result.S = _S(result.E);
        result.Dout = _Dout(result.S);
        result.d = _d(result.Dout);
        result.L = _L(this.gap);
        result.q = _q(result.L);

        this.sandbox.trigger("calculate:ready", "ВСЁ ОК! Смотри консоль!");

        return result;
    };

    p.setup = function (D, H, gap, Tk) {
        this.D = D || this.D;
        this.H = H || this.H;
        this.gap = gap || this.gap;
        this.Tk = Tk || this.Tk;
    };

    return Calculator;
},