const $ = document.querySelector.bind(document);

document.addEventListener('DOMContentLoaded', () => {
  const calculateButton = $('.calc-result');
  if (calculateButton) {
    calculateButton.addEventListener('click', performCalculation);
  }

  const savedResult = localStorage.getItem('previousResult');
  const prevResultElement = $('.prev-result');

  if (prevResultElement && savedResult) {
    prevResultElement.textContent = savedResult;
  }
});

function performCalculation() {
  const firstInput = $('#first-number');
  const secondInput = $('#second-number');
  const operationSelect = $('.select-operation');
  
  if (!firstInput || !secondInput || !operationSelect) return;
  
  const firstNumber = +firstInput.value;
  const secondNumber = +secondInput.value;
  const operation = operationSelect.value;

  if (isNaN(firstNumber) || isNaN(secondNumber)) {
    return alert('Заполните все поля!');
  }

  const operations = {
    'add': { fn: (a, b) => a + b, symbol: '+' },
    'sub': { fn: (a, b) => a - b, symbol: '-' },
    'mul': { fn: (a, b) => a * b, symbol: '∗' },
    'div': { 
      fn: (a, b) => {
        if (b === 0) throw new Error('Деление на ноль!');
        return a / b;
      },
      symbol: '/' 
    }
  };

  const op = operations[operation];
  if (!op) return alert('Выберите операцию!');

  try {
    const result = op.fn(firstNumber, secondNumber);
    const output = `${firstNumber} ${op.symbol} ${secondNumber} = ${result}`;

    const currentResultElement = $('.current-result');
    const prevResultElement = $('.prev-result');

    if (currentResultElement && prevResultElement) {
      if (currentResultElement.textContent) {
        prevResultElement.textContent = currentResultElement.textContent;
        localStorage.setItem('previousResult', currentResultElement.textContent);
      }
      currentResultElement.textContent = output;
    }
  } catch (error) {
    alert(error.message);
  }
}