// Get DOM elements we need to manipulate.
const resultDisplay = document.querySelector(".result");
const sequenceDisplay = document.querySelector(".sequence");
const buttons = document.querySelectorAll(".buttons button");

// ---- Global Variables ---- //
var isCompletingOperation = false;
var justUsedEquals = false;
var resultStr = "";
var sequenceStr = "";
var firstValue = "";
var operation = "";

// Put event listeners on each button
[...buttons].forEach(function (button) {
  button.addEventListener("click", onButtonPress);
});

function onButtonPress(e) {
  if (isUtilityButton(e.target.textContent)) {
    console.log("Match found");
    if (isOperationButton(e.target.textContent)) {
      console.log("Is operation");
      if (resultStr) {
        if (justUsedEquals) {
          sequenceStr += " " + e.target.textContent + " ";
          justUsedEquals = false;
        } else {
          sequenceStr += resultStr + " " + e.target.textContent + " ";
        }

        if (isCompletingOperation) {
          executeOperation();
        } else {
          isCompletingOperation = true;
          firstValue = resultStr;
          operation = sequenceStr[sequenceStr.length - 2];
          sequenceDisplay.textContent = sequenceStr;
          resultStr = "";
        }
      } else {
      }
    } else {
      console.log("Is not operation");
      if (e.target.textContent == "C") {
        isCompletingOperation = false;
        resultStr = "";
        sequenceStr = "";
        firstValue = "";
        operation = "";
        sequenceDisplay.textContent = sequenceStr;
        resultDisplay.textContent = resultStr;
      } else if (e.target.textContent == "DELETE") {
        if (resultStr.length > 0) {
          if (!justUsedEquals) {
            resultStr = resultStr.slice(0, -1);
            resultDisplay.textContent = resultStr;
          }
        }
      } else {
        if (resultStr && firstValue && operation && !justUsedEquals) {
          executeOperation(true);
          justUsedEquals = true;
        }
      }
    }
  } else {
    console.log("No match found");
    if (e.target.textContent == ".") {
      if (resultStr) {
        if (!resultStr.includes(".")) {
          resultStr += ".";
          resultDisplay.textContent = resultStr;
        }
      } else {
        resultStr += "0.";
        resultDisplay.textContent = resultStr;
      }
    } else if (e.target.textContent == "0") {
      if (resultStr && resultStr.length < 19) {
        resultStr += e.target.textContent;
        resultDisplay.textContent = resultStr;
      }
    } else {
      if (resultStr.length < 19) {
        resultStr += e.target.textContent;
        resultDisplay.textContent = resultStr;
      }
    }
  }
}

function executeOperation(isEquals) {
  var a = Number(firstValue);
  var b = Number(resultStr);

  switch (operation) {
    case "+":
      firstValue = add(a, b).toString();
      break;
    case "-":
      firstValue = subtract(a, b).toString();
      break;
    case "*":
      firstValue = multiply(a, b).toString();
      break;
    case "/":
      firstValue = divide(a, b).toString();
      break;
  }
  firstValue = Math.round(firstValue * 100) / 100;
  resultDisplay.textContent = firstValue;
  resultStr = "";
  operation = sequenceStr[sequenceStr.length - 2];
  if (isEquals) {
    sequenceStr = firstValue;
    sequenceDisplay.textContent = "";
    resultStr = firstValue;
    isCompletingOperation = false;
  } else {
    sequenceStr = firstValue + " " + operation + " ";
    sequenceDisplay.textContent = sequenceStr;
  }
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

function isUtilityButton(button) {
  const utilityButtons = ["C", "DELETE", "/", "*", "-", "+", "="];
  var match = false;
  utilityButtons.forEach((value) => {
    if (button == value) {
      match = true;
    }
  });
  if (match) {
    return true;
  }
}

function isOperationButton(button) {
  const operationsButtons = ["+", "-", "*", "/"];
  var match = false;
  operationsButtons.forEach((value) => {
    if (button == value) {
      match = true;
    }
  });
  if (match) {
    return true;
  }
}
