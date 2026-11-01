
import { useState } from "react";
import "./App.css";

function App() {
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [result, setResult] = useState("");

  function calculate(operation) {
    const a = Number(num1);
    const b = Number(num2);

    if (num1 === "" || num2 === "") {
      alert("Please enter both numbers");
      return;
    }

    let answer;

    if (operation === "+") {
      answer = a + b;
    } else if (operation === "-") {
      answer = a - b;
    } else if (operation === "*") {
      answer = a * b;
    } else if (operation === "/") {
      if (b === 0) {
        alert("Cannot divide by zero");
        return;
      }
      answer = a / b;
    }

    setResult(answer);
  }

  return (
    <div className="container">
      <h1>Simple Calculator</h1>

      <input
        type="number"
        placeholder="Enter first number"
        value={num1}
        onChange={(e) => setNum1(e.target.value)}
      />

      <input
        type="number"
        placeholder="Enter second number"
        value={num2}
        onChange={(e) => setNum2(e.target.value)}
      />

      <div className="buttons">
        <button onClick={() => calculate("+")}>+</button>
        <button onClick={() => calculate("-")}>-</button>
        <button onClick={() => calculate("*")}>×</button>
        <button onClick={() => calculate("/")}>÷</button>
      </div>

      <h2>Result: {result}</h2>
    </div>
  );
}

export default App;
