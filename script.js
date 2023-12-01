"strict";

const mainScreen = document.querySelector(".main-screen");
const solutionScreen = document.querySelector(".solution-screen");
const controls = document.querySelector(".controls");
const numbers = document.querySelectorAll(".num");
const operator = document.querySelectorAll(".operators");

let input = "";
let operation = "";
let toCalc = [];
let answer = 0;
let operatorController = "";
let operatorSignController = "";
let lastInput = "";
let readyToCalculate = true;

// This will return am integer number or a number with a decimal depending on the calculated result
const processedNumber = function (number) {
  return Number.isInteger(number) ? number : number.toFixed(2);
};

// Will do the calculation based on the previously pressed operator.
const calculate = function (control, arr) {
  let partialAnswer = 0;
  console.log(control);
  switch (control) {
    case "add":
      partialAnswer = applyAddition(arr);
      return processedNumber(partialAnswer);
    case "minus":
      partialAnswer = applySubtraction(arr);
      return processedNumber(partialAnswer);
    case "multiply":
      partialAnswer = applyMultiplication(arr);
      return processedNumber(partialAnswer);
    case "divide":
      partialAnswer = applyDivision(arr);
      return processedNumber(partialAnswer);
  }
};

// Set the controller if controller is undefined to the currently pressed operator
const checkController = function (key) {
  if (!operatorController) operatorController = key;
};

const applyAddition = function (arr) {
  return arr
    .map((num) => num * 1)
    .reduce((accum, num) => {
      return accum + num;
    });
};

const applySubtraction = function (arr) {
  return arr
    .map((num) => num * 1)
    .reduce((accum, num) => {
      return accum - num;
    });
};

const applyMultiplication = function (arr) {
  return arr
    .map((num) => num * 1)
    .reduce((accum, num) => {
      return accum * num;
    });
};

const applyDivision = function (arr) {
  return arr
    .map((num) => num * 1)
    .reduce((accum, num) => {
      return accum / num;
    });
};

// Update the array used to calculate and delete the input fields thereafter
const updateData = function (sign) {
  // Check if input is currently a falsy value
  if (!input) return;
  toCalc.push(input * 1);
};

const clearInput = function () {
  input = "";
};

const errorHappened = function () {
  toCalc = [];
  input = "";
};

// Update the main screen with the answer and the solution screen with the answer and the previously pressed operator
const updateBothScreen = function (num, sign, control = "", arr = "") {
  if (!control) {
    mainScreen.textContent = num;
    solutionScreen.textContent = `${num} ${sign}`;
  } else {
    mainScreen.textContent = answer;
    solutionScreen.textContent = `${arr[0]} ${control} ${arr[1]} ${sign}`;
  }
};

const updateSolutionScreen = function (sign, answer = "") {
  // If asnwer is not yet present solution screen will be input and sign
  if (!answer) {
    console.log("a");
    solutionScreen.textContent = `${input} ${sign}`;
  } else {
    // If asnwer is not yet present solution screen will be input and sign
    console.log("b");
    solutionScreen.textContent = `${answer} ${sign}`;
  }
};

const updateScreenError = function () {
  mainScreen.textContent = "What?";
  errorHappened();
  solutionScreen.textContent = "";
};

const udpateDataEquals = function (sign) {
  if (toCalc.length < 2) toCalc.push(input * 1);
  input = "";
};

const isInputValid = function () {
  if (input === ".") {
    return false;
  }

  // Will check if previously pressed operator is = so that the proram will preoceed to calculate
  // if (operatorSignController === "=" && !input) return true;

  // Will check if there is no input
  if (!input) return false;
  return true;
};

const iscannotBeSolve = function (arr) {
  if (arr[1] === 0 && operatorController === "divide") {
    updateScreenError();

    return true;
  }

  return false;
};

const applyActions = function (sign, key) {
  updateSolutionScreen(sign, answer);
  if (!isInputValid()) {
    console.log("hey");
    operatorController = key;
    operatorSignController = sign;
    return;
  }
  checkController(key);
  updateData(sign);
  clearInput();
  operatorSignController = sign;
  if (toCalc.length <= 1) return;

  // If second number is 0 return an error and a if it's a division
  if (iscannotBeSolve(toCalc)) return;
  answer = calculate(operatorController, toCalc);
  toCalc.splice(0, toCalc.length, answer);
  console.log("Hey");
  updateBothScreen(answer, sign);
  operatorController = key;
  operatorSignController = sign;
};

const operators = {
  clear(sign) {
    mainScreen.textContent = "0";
    solutionScreen.textContent = "";
    input = "";
    toCalc = [];
    operatorController = "";
    operatorSignController = "";
    answer = 0;
  },
  add(sign, key) {
    applyActions(sign, key);
  },
  minus(sign, key) {
    applyActions(sign, key);
  },
  multiply(sign, key) {
    applyActions(sign, key);
  },
  divide(sign, key) {
    applyActions(sign, key);
  },
  equal(sign, key) {
    updateSolutionScreen(sign, answer);
    if (!isInputValid()) {
      console.log("hey");
      operatorController = key;
      operatorSignController = sign;
      return;
    }

    udpateDataEquals(sign);

    // if (toCalc.length <= 1) return;
    if (toCalc.length <= 1) return;
    if (iscannotBeSolve(toCalc)) return;
    answer = calculate(operatorController, toCalc);
    updateBothScreen(answer, sign, operatorSignController, toCalc);
    toCalc.splice(0, toCalc.length, answer);

    // This will tell the program that equal sign was pressed previously
    // operatorController = key;
    operatorSignController = sign;
  },
};

// Set the input pressed and simultaneiosly update the textcontent of the main screen
let setInput = function (inp) {
  if (input.length <= 8) {
    input += inp;
    mainScreen.textContent = input;
  }
};

const cannotCalculate = function (sign) {
  if (toCalc.length === 2 && operatorSignController === "=") {
    return true;
  }
  return false;
};

// Event Listeners for the number keypad
numbers.forEach((item) => {
  item.addEventListener("click", function (e) {
    let button = e.target.textContent;
    setInput(button);
  });
});

// Event listener for the operator keypad
operator.forEach((item) => {
  item.addEventListener("click", function (e) {
    let button = e.target.dataset.value; // This will be the method name
    let sign = e.target.textContent.trim(); // This is the operator sign
    operators[`${button}`](sign, button); //Will run a method based on what operator was pressed
  });
});

const keyPressedFunction = function (value, sign) {
  if (/[.0-9]/g.test(sign)) {
    setInput(sign);
  } else {
    if (sign === "Enter") sign = "=";
    let button = value.dataset.value;
    operators[`${button}`](sign, button);
  }
};

window.addEventListener("keypress", function (e) {
  const key = document.querySelector(`div[data-key="${e.key}`);
  if (!key) return;
  let keyValue = key.dataset.key;
  keyPressedFunction(key, keyValue);
  key.classList.add("pressed");
});

controls.addEventListener("transitionend", function (e) {
  e.target.classList.remove("pressed");
});
