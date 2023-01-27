// Get DOM elements we need to manipulate.
const resultDisplay = document.querySelector(".result");
const sequenceDisplay = document.querySelector(".sequence");
const buttons = document.querySelectorAll(".buttons button");

// Strings to hold current values
var currentStr = "";
var resultStr = "";

// Booleans to track what operation we are doing
var isDivide = false;
var isMultiply = false;
var isAddition = false;
var isSubtraction = false;

// Put event listeners on each button
[...buttons].forEach(function (button) {
  button.addEventListener("click", onButtonPress);
});

function onButtonPress(e) {
  resultDisplay.textContent = e.target.textContent;
  // Check if button pressed was anything other than a number/decimal
  if (checkIfUtilityButton(e.target.textContent)) {
    executeUtilityButton(e.target.textContent);
    return;
  }

  // Check if we are completing an operation
  if (isCompletingOperation()) {
    // If we are, check what operation and execute it
    executeOperation();
  }

  currentStr += e.target.textContent;
  displayCurrentSequence();
}

function checkIfUtilityButton(value) {
  const utilityLookup = ["C", "/", "*", "-", "+", "=", "+ / -"];
  let foundMatch = utilityLookup.some((code) => code === value);
  return foundMatch ? true : false;
}

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
  return a / b;
}

function executeUtilityButton(button) {
  switch (button) {
    case "C":
      clearCalculator();
      break;
    case "/":
      currentStr += " / ";
      displayCurrentSequence();
      isDivide = true;
      break;
  }
}

function divide(a, b) {}

function clearCalculator() {
  currentStr = "";
  displayCurrentSequence();
}

function displayCurrentSequence() {
  sequenceDisplay.textContent = currentStr;
}

function isCompletingOperation() {
  if (isDivide || isMultiply || isAddition || isSubtraction) {
    return true;
  }
}

function executeOperation() {
  let a = getFirstValue();
  let b = getSecondValue();

  if (isAddition) {
    add(a, b);
  } else if (isSubtraction) {
    subtract(a, b);
  } else if (isMultiply) {
    multiply(a, b);
  } else {
    divide(a, b);
  }
}

function numbers() {
  const regex = /(?<= . )[0-9]+/g;
  let matches = Number(currentStr.match(regex));
}

function getSecondValue() {
  return found[0];
}
