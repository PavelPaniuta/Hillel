class Calculator {
  add = (a, b) => {
    return a + b;
  };
  subtract = (a, b) => {
    return a - b;
  };
  multiply = (a, b) => {
    return a * b;
  };
  divide = (a, b) => {
    return a / b;
  };
}

const calc = new Calculator();

console.log(calc.add(10, 4));
console.log(calc.subtract(10, 2));
console.log(calc.multiply(10, 2));
console.log(calc.divide(10, 2));
