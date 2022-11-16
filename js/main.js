(() => {
    const previousNumber = document.querySelector(".js-previousNumber");
    const mathOperator = document.querySelector(".js-mathSign");
    const currentNumber = document.querySelector(".js-currentNumber");
    const numbers = document.querySelectorAll(".js-sign");
    const operators = document.querySelectorAll(".js-operator");
    const equalBtn = document.querySelector(".js-equal");
    const clearBtn = document.querySelector(".js-clear");

    let result = "";

    const clickNumber = (e) => {
        if (e.target.textContent === "." && currentNumber.textContent.includes(".")) return;
        if (e.target.textContent === "." && currentNumber.textContent === "") return currentNumber.textContent = ".0";
        return currentNumber.textContent += e.target.textContent;
    }

    const clickOperator = (e) => {
        if (currentNumber.textContent) {
            previousNumber.textContent = currentNumber.textContent;
            currentNumber.textContent = "";
            return mathOperator.textContent = e.target.textContent;
        }
    }

    const showResult = () => {
        currentNumber.style.fontWeight = "700";
        currentNumber.style.color = "blue";
        return currentNumber.textContent = result;
    }

    //@TODO Wstawić obsługę liczb ujemnych

    const isEqual = () => {
        //@TODO Problem liczb zmiennoprzecinkowych w JS
        let operator = mathOperator.textContent;
        let a = Number(previousNumber.textContent);
        let b = Number(currentNumber.textContent);
        if (typeof a !== "undefined" && typeof b !== "undefined") {
            switch (operator) {
                case "+":
                    result = a + b;
                    break;
                case "-":
                    result = a - b;
                    break;
                case "x":
                    result = a * b;
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
    }

    const clearDisplay = () => {
        previousNumber.textContent = "";
        currentNumber.textContent = "";
        mathOperator.textContent = "";
        result = "";
    }

    //@TODO Oprogramować historię wyników

    numbers.forEach((number) => number.addEventListener("click", clickNumber));
    operators.forEach((operator) => operator.addEventListener("click", clickOperator));
    equalBtn.addEventListener("click", isEqual);
    clearBtn.addEventListener("click", clearDisplay);
})();