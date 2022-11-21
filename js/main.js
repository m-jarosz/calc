(() => {
  const previousNumber = document.querySelector(".js-previousNumber");
  const mathOperator = document.querySelector(".js-mathSign");
  const currentNumber = document.querySelector(".js-currentNumber");
  const numbers = document.querySelectorAll(".js-sign");
  const operators = document.querySelectorAll(".js-operator");
  const equalBtn = document.querySelector(".js-equal");
  const clearBtn = document.querySelector(".js-clear");
  const switchNegative = document.querySelector(".js-negative");
  const historyBtn = document.querySelector(".js-history");
  const historySection = document.querySelector(".history");
  const closeHistoryBtn = document.querySelector(".js-exitHistKey");
  const clearHistoryBtn = document.querySelector(".js-clearHistKey");
  const listToShow = document.querySelector(".js-operation-list");

  let result = "";
  const operationHistory = JSON.parse(localStorage.getItem("history")) || [];

  const setNegativeValue = () => {
    currentNumber.textContent = "-";
  };

  const clickNumber = (e) => {
    if (e.target.textContent === "." && currentNumber.textContent.includes("."))
      return;
    if (e.target.textContent === "." && currentNumber.textContent === "")
      return (currentNumber.textContent = ".0");
    if (e.target.textContent === "0" && currentNumber.textContent === "-")
      return (currentNumber.textContent = "0");
    return (currentNumber.textContent += e.target.textContent);
  };

  const clickOperator = (e) => {
    if (currentNumber.textContent) {
      previousNumber.textContent = currentNumber.textContent;
      currentNumber.textContent = "";
      return (mathOperator.textContent = e.target.textContent);
    }
  };

  const showResult = () => {
    currentNumber.style.fontWeight = "700";
    currentNumber.style.color = "blue";
    currentNumber.textContent = result;
  };

  const isEqual = () => {
    let operator = mathOperator.textContent;
    let a = Number(previousNumber.textContent);
    let b = Number(currentNumber.textContent);
    if (typeof a !== "undefined" && typeof b !== "undefined") {
      switch (operator) {
        case "+":
          result = (a * 10 + b * 10) / 10;
          break;
        case "-":
          result = (a * 10 - b * 10) / 10;
          break;
        case "x":
          result =
            Number.isInteger(a) || Number.isInteger(b)
              ? a * b
              : (a * 10 * (b * 10)) / 10;
          break;
        case "/":
          result = b === 0 ? "n/0 err" : a / b;
          break;
        case "nn":
          result = Math.pow(a, b);
          break;
        case "%":
          result = (b / 100) * a;
          break;
        case "√":
          result = Math.sqrt(a);
          break;
      }
      showResult();
    }
    saveHistory(a, operator, b, result);
  };

  const clearDisplay = () => {
    previousNumber.textContent = "";
    currentNumber.textContent = "";
    mathOperator.textContent = "";
    result = "";
  };

  //@TODO Oprogramować historię wyników
  const saveHistory = (a, operation, b, result) => {
    operationHistory.push(
      `${a} ${operation} ${b < 0 ? `(${b})` : b} = ${result}`
    );
    localStorage.setItem("history", JSON.stringify(operationHistory));
  };

  const prepareHistory = () => {
    const reverseArrayHistory = [...operationHistory];
    return reverseArrayHistory.reverse();
  };

  const showHistory = () => {
    historySection.classList.toggle("active");
    const historyToShow = prepareHistory();
    historyToShow.forEach((item) => {
      const itemList = document.createElement("li");
      itemList.textContent = item;
      listToShow.appendChild(itemList);
    });
  };

  const clearHistory = () => {
    localStorage.removeItem("history");
    listToShow.textContent = "";
  };

  const closeHistory = () => {
    historySection.classList.toggle("active");
    listToShow.textContent = "";
    clearDisplay();
  };

  numbers.forEach((number) => number.addEventListener("click", clickNumber));
  operators.forEach((operator) =>
    operator.addEventListener("click", clickOperator)
  );
  equalBtn.addEventListener("click", isEqual);
  clearBtn.addEventListener("click", clearDisplay);
  switchNegative.addEventListener("click", setNegativeValue);
  historyBtn.addEventListener("click", showHistory);
  closeHistoryBtn.addEventListener("click", closeHistory);
  clearHistoryBtn.addEventListener("click", clearHistory);
})();
