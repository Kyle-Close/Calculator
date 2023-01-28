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

var keepResultDisplayed = false;

// Put event listeners on each button
[...buttons].forEach(function (button) {
  button.addEventListener("click", onButtonPress);
});

function onButtonPress(e) {
  // Check if button pressed was anything other than a number/decimal
  if (checkIfUtilityButton(e.target.textContent)) {
    executeUtilityButton(e.target.textContent);
    if (keepResultDisplayed) {
      keepResultDisplayed = false;
    } else {
      clearResultDisplay();
    }

    return;
  } else {
    resultStr += e.target.textContent;
    displayCurrentResult();
  }

  // Check if we are completing an operation
  if (isCompletingOperation()) {
    // If we are, check what operation and execute it
    executeOperation();
    displayCurrentResult();
  }

  currentStr += e.target.textContent;
  displayCurrentSequence();
  displayCurrentResult();
}

function clearResultDisplay() {
  resultDisplay.textContent = "";
  resultStr = "";
}

function displayCurrentResult() {
  resultDisplay.textContent = resultStr;
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
  result = a / b;
  resultDisplay.textContent = result;
  resultStr = result.toString();
  return result;
}

function executeUtilityButton(button) {
  switch (button) {
    case "C":
      clearCalculator();
      break;
    case "/":
      currentStr += " / ";
      displayCurrentSequence();
      if (isDivide) {
        executeOperation();
        keepResultDisplayed = true;
        isDivide = false;
      } else {
        isDivide = true;
      }

      break;
  }
}

function clearCalculator() {
  currentStr = "";
  displayCurrentSequence();
}

function displayCurrentSequence() {
  sequenceDisplay.textContent = currentStr;
  return;
}

function isCompletingOperation() {
  if (
    (isDivide || isMultiply || isAddition || isSubtraction) &&
    checkIfUtilityButton()
  ) {
    return true;
  }
}

function executeOperation() {
  var a = getNumA();
  var b = getNumB();

  if (isAddition) {
    add(a, b);
  } else if (isSubtraction) {
    subtract(a, b);
  } else if (isMultiply) {
    multiply(a, b);
  } else {
    divide(a, b);
  }
  return;
}

function getNumA() {
  const regex = /\d+/g;
  let matches = currentStr.match(regex);
  let length = matches.length;
  console.log(length);
  if (length > 1) {
    let a = Number(matches[length - 2]);
    console.log("a: " + a);
    return a;
  } else {
    let a = Number(matches[0]);
    console.log("a: " + a);
    return a;
  }
}

function getNumB() {
  return Number(resultStr);
}
