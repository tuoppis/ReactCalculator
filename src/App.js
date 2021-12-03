import logo from './logo.svg';
import './App.css';
import Action from "./Action";
import Calculator from './Calculator';
import Display from './Display';
import Numerator from './Numerator';
import Operator from './Operator';
import Unary from './Unary';
import {useState} from "react";

var calculator = new Calculator();

function App() {
  const [display, setDisplay] = useState({upper:"", lower:"", disableANS:true, disableDEL:true});
  calculator.setUpdater(setDisplay);

  return (
    <div className="App">
      <header className="App-header">
        <Display upper={display.upper} lower={display.lower}/>
        <Action type="AC" context={calculator} display={display} />
        <Action type="DEL" context={calculator} display={display} />
        <Action type="ANS" context={calculator} display={display} />
        <Unary type="1/x" context={calculator} />
        <Unary type="x²" context={calculator} />
        <Unary type="√x" context={calculator} />
        <Operator type="÷" context={calculator} />
        <Numerator type="7" context={calculator} />
        <Numerator type="8" context={calculator} />
        <Numerator type="9" context={calculator} />
        <Operator type="×" context={calculator} />
        <Numerator type="4" context={calculator} />
        <Numerator type="5" context={calculator} />
        <Numerator type="6" context={calculator} />
        <Operator type="+" context={calculator} />
        <Numerator type="1" context={calculator} />
        <Numerator type="2" context={calculator} />
        <Numerator type="3" context={calculator} />
        <Operator type="-" context={calculator} />
        <Numerator type="±" context={calculator} />
        <Numerator type="0" context={calculator} />
        <Numerator type="." context={calculator} />
        <Action type="=" context={calculator} display={display} />
      </header>
    </div>
  );
}

export default App;
