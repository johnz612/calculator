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

// Will do the calculation based on the previously pressed operator.
const calculate = function (control, arr) {
  switch (control) {
    case "add":
      return applyAddition(arr).toFixed(2);
    case "minus":
      return applySubtraction(arr).toFixed(2);
    case "multiply":
      return applyMultiplication(arr).toFixed(2);
    case "divide":
      return applyDivision(arr).toFixed(2);
  }
};

// Set the controller if controller is undefined to the currently pressed operator
const checkController = function (key) {
  if (!operatorController) operatorController = key;
};

const applyAddition = function (arr) {
  return arr.reduce((accum, num) => {
    return accum + num;
  });
};

const applySubtraction = function (arr) {
  return arr.reduce((accum, num) => {
    return accum - num;
  });
};

const applyMultiplication = function (arr) {
  return arr.reduce((accum, num) => {
    return accum * num;
  });
};

const applyDivision = function (arr) {
  return arr.reduce((accum, num) => {
    return accum / num;
  });
};

// Update the array used to calculate and delete the input fields thereafter
const updateData = function (sign) {
  toCalc.push(input * 1);
  solutionScreen.textContent = `${input} ${sign}`;
  input = "";
};

const updateScreen = function (answer, sign) {
  mainScreen.textContent = answer;
  solutionScreen.textContent = `${answer} ${sign}`;
};

const operators = {
  clear(sign) {
    mainScreen.textContent = "0";
    solutionScreen.textContent = "";
    input = "";
    toCalc = [];
    operatorController = "";
    console.log(toCalc);
  },
  add(sign, key) {
    // only calculate if user previously perssed an input
    if (!input) {
      // to update the previous opeartor key pressed
      operatorController = key;
      return;
    }
    checkController(key);
    updateData(sign);
    if (toCalc.length <= 1) return;
    console.log(operatorController);

    answer = calculate(operatorController, toCalc);
    toCalc.splice(0, toCalc.length, answer);
    updateScreen(answer, sign);
    operatorController = key;
  },
  minus(sign, key) {
    if (!input) {
      operatorController = key;
      return;
    }
    checkController(key);
    updateData(sign);
    if (toCalc.length <= 1) return;
    console.log(operatorController);

    answer = calculate(operatorController, toCalc);
    toCalc.splice(0, toCalc.length, answer);
    updateScreen(answer, sign);
    operatorController = key;
  },
  multiply(sign, key) {
    if (!input) {
      operatorController = key;
      return;
    }
    checkController(key);
    updateData(sign);
    if (toCalc.length <= 1) return;
    console.log(operatorController);
    answer = calculate(operatorController, toCalc);
    toCalc.splice(0, toCalc.length, answer);
    updateScreen(answer, sign);
    operatorController = key;
  },
  divide(sign, key) {
    if (!input) {
      operatorController = key;
      return;
    }
    checkController(key);
    updateData(sign);
    if (toCalc.length <= 1) return;
    console.log(operatorController);

    answer = calculate(operatorController, toCalc);
    toCalc.splice(0, toCalc.length, answer);
    updateScreen(answer, sign);
    operatorController = key;
  },
};

let setInput = function (inp) {
  if (input.length <= 8) {
    input += inp;
    mainScreen.textContent = input;
  }
};

numbers.forEach((item) => {
  item.addEventListener("click", function (e) {
    let button = e.target.textContent;
    setInput(button);
  });
});

operator.forEach((item) => {
  item.addEventListener("click", function (e) {
    let button = e.target.dataset.key;
    let sign = e.target.textContent;
    operators[`${button}`](sign, button); //Will run a method based on what operator was pressed
  });
});
