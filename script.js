const $ = document.querySelector.bind(document);

function isLocalStorageAvailable() {
  try {
    const testKey = '__test__';
    window.localStorage.setItem(testKey, 'test');
    window.localStorage.removeItem(testKey);
    return true;
  } catch (e) {
    console.warn('localStorage недоступен:', e.message);
    return false;
  }
}

const localStorageAvailable = isLocalStorageAvailable();

document.addEventListener('DOMContentLoaded', () => {
  const calculateButton = $('.button-calculate');
  if (calculateButton) {
    calculateButton.addEventListener('click', performCalculation);
  }

  let savedResult = null;
  if (localStorageAvailable) {
    savedResult = localStorage.getItem('previousResult');
  }

  const prevResultElement = $('.result-previous');

  if (prevResultElement && savedResult) {
    prevResultElement.textContent = savedResult;
  }
});

function performCalculation() {
  const firstInput = $('#first-number');
  const secondInput = $('#second-number');
  const operationSelect = $('.select-field-operation');
  
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
    'mul': { fn: (a, b) => a * b, symbol: '×' },
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

    const currentResultElement = $('.result-current');
    const prevResultElement = $('.result-previous');

    if (currentResultElement && prevResultElement) {
      if (currentResultElement.textContent && localStorageAvailable) {
        prevResultElement.textContent = currentResultElement.textContent;
        try {
          localStorage.setItem('previousResult', currentResultElement.textContent);
        } catch (e) {
          console.error('Ошибка сохранения в localStorage:', e.message);
        }
      }
      currentResultElement.textContent = output;
    }
  } catch (error) {
    alert(error.message);
  }
}
