function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) return "Snarky Error! Can't divide by 0";
    return a / b;
}

function operate(operator, a, b) {
    a = Number(a);
    b = Number(b);
    switch (operator) {
        case "+": return add(a, b);
        case "-": return subtract(a, b);
        case "*": return multiply(a, b);
        case "/": return divide(a, b);
        default: return null;
    }
}

let firstNumber = "";
let secondNumber = "";
let currentOperator = null;
let shouldResetDisplay = false;

const display = document.querySelector("#display");
const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const equalsButton = document.querySelector("#equals");
const clearButton = document.querySelector("#clear");
const backspaceButton = document.querySelector("#backspace");
const decimalButton = document.querySelector("#decimal");

function updateDisplay(content) {
    display.textContent = content;
}

function appendNumber(number) {
    if (display.textContent === "0" || shouldResetDisplay) {
        display.textContent = number;
        shouldResetDisplay = false;
    } else {
        display.textContent += number;
    }
}

function appendDecimal() {
    if (shouldResetDisplay) {
        display.textContent = "0.";
        shouldResetDisplay = false;
        return;
    }
    if (!display.textContent.includes(".")) {
        display.textContent += ".";
    }
}

function roundResult(number) {
    if (typeof number === "string") return number;
    return Math.round(number * 1000) / 1000;
}

function setOperator(operator) {
    if (currentOperator !== null) evaluate();
    firstNumber = display.textContent;
    currentOperator = operator;
    shouldResetDisplay = true;
}

function evaluate() {
    if (currentOperator === null || shouldResetDisplay) return;
    secondNumber = display.textContent;

    let result = operate(currentOperator, firstNumber, secondNumber);
    result = roundResult(result);

    updateDisplay(result);
    firstNumber = result;
    currentOperator = null;
    shouldResetDisplay = true;
}

function clear() {
    display.textContent = "0";
    firstNumber = "";
    secondNumber = "";
    currentOperator = null;
    shouldResetDisplay = false;
}

function deleteNumber() {
    if (shouldResetDisplay) return;
    display.textContent = display.textContent.slice(0, -1) || "0";
}

numberButtons.forEach(button => {
    button.addEventListener("click", () => appendNumber(button.textContent));
});

operatorButtons.forEach(button => {
    button.addEventListener("click", () => setOperator(button.textContent));
});

equalsButton.addEventListener("click", evaluate);
clearButton.addEventListener("click", clear);
backspaceButton.addEventListener("click", deleteNumber);
decimalButton.addEventListener("click", appendDecimal);

window.addEventListener("keydown", (e) => {
    if (e.key >= "0" && e.key <= "9") appendNumber(e.key);
    if (e.key === ".") appendDecimal();
    if (e.key === "=" || e.key === "Enter") evaluate();
    if (e.key === "Backspace") deleteNumber();
    if (e.key === "Escape") clear();
    if (["+", "-", "*", "/"].includes(e.key)) setOperator(e.key);
});