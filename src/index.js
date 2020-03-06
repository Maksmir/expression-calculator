function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    const myCalculator = (expr) => {
        let arr = []
        if ((typeof expr) == "string") {
            for (let i = 0, j = 0; i < expr.length; i++) {
                if (expr[i] == "(" || expr[i] == ")" || expr[i] == "+" || expr[i] == "-" || expr[i] == "/" || expr[i] == "*") {
                    if (arr[j]) {
                        j++
                    }
                    arr[j] = expr[i]
                    j++
                } else if (expr[i] == " " || expr[i] == "") {

                } else {
                    if (!arr[j]) {
                        arr[j] = expr[i]
                    } else {
                        arr[j] += expr[i]
                    }
                }
            }
        } else {
            arr = expr
        }

        expr = souks(arr)
        const calculator = (e1, operator, e2) => {
            if (operator == "+") {
                return Number(e1) + Number(e2)
            } else if (operator == "-") {
                return Number(e1) - Number(e2)
            } else if (operator == "*") {
                return Number(e1) * Number(e2)
            } else if (operator == "/") {
                if (Number(e2) == 0){
                    throw new TypeError("TypeError: Division by zero.")
                } else {
                    return Number(e1) / Number(e2)
                }
            }
        }
        const calculate = (operator) => {
            for (let i = 0; i < expr.length; i++) {
                if (expr[i] == operator) {
                    let value = String(calculator(expr[i - 1], expr[i], expr[i + 1]))
                    expr.splice(i - 1, 3, value);
                    i = i - 2
                }
            }
        }
        calculate("/")
        calculate("*")
        calculate("-")
        calculate("+")
        return expr.join("")
    }

    const souks = (arr) => {
        let value = arr
        let score = 0
        let start = 0
        let stop = 0

        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === "(") {
                if (score === 0) {
                    start = i
                }
                score++
            } else if (arr[i] === ")") {
                score--
                if (score === 0) {
                    stop = i
                    break
                }
            }
        }
        if (score !== 0) {
            throw new Error("ExpressionError: Brackets must be paired")
        }
        if (start === 0 && stop === 0) {
            return value
        } else {
            value.splice(start, stop - start + 1, myCalculator(arr.slice(start + 1, stop)))
            return souks(value)
        }
    }

    return Number(myCalculator(expr))
}

module.exports = {
    expressionCalculator
}