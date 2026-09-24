const History = document.getElementById("History");
const Result = document.getElementById("Result");

let ResetEquation = false;

function AddNumber(number) {
    if (ResetEquation){
        Result.innerText = "";
        ResetEquation = false;
    }
    Result.innerText += number;
}

function AddOperation(Operation) {
    if (ResetEquation) ResetEquation = false;
    const Equation = Result.innerText;
    if (Equation[Equation.length - 1] === ".") Result.innerText += 0;
    else if (['+', '-', 'x', '÷'].includes(Equation[Equation.length - 1])) Result.innerText = Result.innerText.slice(0, -1);
    if (Equation.length !== 0) Result.innerText += Operation;
}

function AddDot(){
    if (ResetEquation) ResetEquation = false;
    const Equation = Result.innerText;
    let PointPutable = true;
    for (let i = Equation.length - 1; i >= 0; i--){
        if (Equation[i] === "."){
            PointPutable = false;
            break;
        }
        else if (['+', '-', 'x', '÷'].includes(Equation[i])){
            break;
        }
    }

    if (PointPutable) {
        if (['+', '-', 'x', '÷'].includes(Equation[Equation.length - 1]) || Equation.length === 0) Result.innerText += 0;
        Result.innerText += ".";
    }
}

function BackSpace() {
    if (ResetEquation) ResetEquation = false;
    Result.innerText = Result.innerText.slice(0, -1);
}

function SolveEquation() {
    const Equation = Result.innerText;
    if (Equation.length !== 0 && !ResetEquation){
        if (['+', '-', 'x', '÷'].includes(Equation[Equation.length - 1])) {
            Result.innerText = "Syntax Error";
            // Result.classList.add("Error");
            return;
        }
        else if (Equation[Equation.length - 1] === ".") Result.innerText += 0;

        History.innerText = Result.innerText;
        Result.innerText = eval(Result.innerText.replace("x", "*").replace("÷", "/"));
        ResetEquation = true;
    }
}

function ClearEquation() {
    if (Result.innerText === "") History.innerText = "0";
    else Result.innerText = "";
}