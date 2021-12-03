
class Calculator {
    constructor(updater) {
      this._res = "";//Number.NaN;
      this._op = "";
      this._opType = "";
      this._input = "";
      this._ans = "";
      this._msg = "";
      this._update = updater
    }

    print() {
        return `In: ${this._input}, Op: ${this._opType}, Res: ${this._res}`
    }

    setUpdater(upd) { this._update = upd; }//this.updateDisplay(); }

    hasResult() { return Number.isFinite(this._res); }
    noResult() { return this._res === ""; } //NaN + INF are results
    hasInput() { return this._input !== ""; }
    noInput() { return this._input === ""; }
    hasOperator() { return this._opType !== ""; }
    noOperator() { return this._opType === ""; }
  
    get currentOp() { return this._opType; } 
    get result() { return this._res; }
    get input() { return this._input; }
    get operationLine() {
        return `${!this.hasResult() ? "": this._res} ${this._opType}`;
    }
  
    parseNum() {
        return Number.parseFloat(this._input);
    }

    resultToString() {
        if (this.hasResult() || this.noResult()) return this._res.toString();
        else {
            return "ERROR";
            // switch (this._res) {
            //     case Number.NEGATIVE_INFINITY: return "-∞";
            //     case Number.POSITIVE_INFINITY: return "∞";
            //     default: return "ERROR";
            // }
        }
    }
  
    calculate() {
        if (this.noInput()) return;
        if (this.noOperator()) {
            this._res = this.parseNum();
            this._input = "";
            this._msg = "";
            return;
        }
        this._res = this._op(this._res, this.parseNum());
        this._input = "";
        this._opType = "=";
        this.updateDisplay();
        this._opType = "";
        this._op = (a, b) => a;
    }

    changeSign() {
        if (this.noInput()) this._input = "-";
        else if (this.input[0] === "-") this._input = this.input.slice(1);
        else this._input = "-" + this._input; 
    }
  
    putNumber(num) {
        switch (num) {
            case ".": if (this._input.includes(num)) return; break;
            case "±": this.changeSign(); num=""; break;
            case "0": if (this.input === num) return; break;
        }
        this._input += num;
        // this._msg = "";
        this.updateDisplay();
    }

    takeNumber() {
        if (this.noInput()) return;
        this._input = this._input.slice(0, -1);
        // this._msg = "";
        this.updateDisplay();
    }
  
    putOperator(type) {
        if (this.noInput()) { // if result exists, then start new operation

            //return;
        } else if (this.hasOperator() && this.hasResult()) {
            this.calculate();
        } else {
            this._res = this.parseNum();
        }
        this._opType = type;
        this._input = "";
        // this._msg = "";

        switch (type) {
            case "+" : this._op = (a, b) => a + b; break;
            case "-" : this._op = (a, b) => a - b; break;
            case "×" : this._op = (a, b) => a * b; break;
            case "÷" : this._op = (a, b) => a / b; break;
            default : this._op = (a, b) => Number.NaN;
        }
        this.updateDisplay();
    }

    putUnary(type) {
        let arg, res, isInput = this.hasInput();
        if (!isInput) {
            if (this.noResult() || this.hasOperator()) return; // must provide input
            arg = this._res;
        } else {
            arg = this.parseNum();
        }
        switch (type) {
            case "√x": res = Math.sqrt(arg); break;
            case "x²": res = arg * arg; break;
            case "1/x": res = 1/arg; break;
            default: return;
        }

        if (!Number.isFinite(res)) {
            // result is not an finite number
        }

        if (isInput && this.hasOperator()) {
            this._input = res.toString();
            this.calculate();
        } else {
            this._res = res;
            this._msg = type.replace("x", arg);
            this._input = "";
            this._opType = "="
            this.updateDisplay();
            this._opType = "";
        }
    }

    clear() {
        this._input = "";
        this._op = "";
        this._opType = "";
        this._res = "";//Number.NaN;
        this._ans = "";
        this._msg = "";
        this.updateDisplay();
    }
    
    action(actType) {
        switch (actType) {
            case "AC":
                this.clear();
                return;
            case "DEL":
                this.takeNumber();
                return;
            case "ANS":
                if (this._ans === "") return;
                this._input = this._ans.toString();
                if (this.noOperator()) {
                    this._res = "";
                }
                this._msg = actType;
                this.updateDisplay();
                return;
            case "=":
                this.calculate();
                if (this.hasResult()) {
                    this._ans = this._res;
                    this._msg = "ANS";
                    this.updateDisplay();
                }
                return;
            default:
                return;
            }
    }
    
    updateDisplay() {
        // console.log(this.print());
        let display={upper:this.operationLine, lower:`${this._msg!=="" ? `(${this._msg}) `: ""}${this.input}`};
        this._msg = "";
        if (this.noInput()) display.disableDEL = true;
        if (!Number.isFinite(this._ans)) display.disableANS = true;
        if (typeof this._update == "undefined" || this._update === "") return;
        this._update(display);
    }
  }


export default Calculator;