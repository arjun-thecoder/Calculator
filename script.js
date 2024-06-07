// JavaScript for Calculator Logic
document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.button');
    let currentInput = '';
    let previousInput = '';
    let operator = '';

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const action = button.getAttribute('data-action');
            const buttonText = button.textContent;

            if (action === 'number') {
                handleNumber(buttonText);
            } else if (action === 'operator') {
                handleOperator(buttonText);
            } else if (action === 'decimal') {
                handleDecimal();
            } else if (action === 'clear') {
                handleClear();
            } else if (action === 'delete') {
                handleDelete();
            } else if (action === 'equals') {
                handleEquals();
            }
        });
    });

    function handleNumber(number) {
        if (currentInput === '0') {
            currentInput = number;
        } else {
            currentInput += number;
        }
        updateDisplay(currentInput);
    }

    function handleOperator(op) {
        if (currentInput === '') return;

        if (previousInput !== '') {
            currentInput = calculate();
        }

        operator = op;
        previousInput = currentInput;
        currentInput = '';
    }

    function handleDecimal() {
        if (!currentInput.includes('.')) {
            currentInput += '.';
        }
        updateDisplay(currentInput);
    }

    function handleClear() {
        currentInput = '';
        previousInput = '';
        operator = '';
        updateDisplay('0');
    }

    function handleDelete() {
        currentInput = currentInput.slice(0, -1);
        if (currentInput === '') {
            updateDisplay('0');
        } else {
            updateDisplay(currentInput);
        }
    }

    function handleEquals() {
        if (currentInput === '' || previousInput === '' || operator === '') return;

        currentInput = calculate();
        operator = '';
        previousInput = '';
        updateDisplay(currentInput);
    }

    function calculate() {
        let result;
        const prev = parseFloat(previousInput);
        const current = parseFloat(currentInput);

        if (isNaN(prev) || isNaN(current)) return;

        switch (operator) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '*':
                result = prev * current;
                break;
            case '/':
                result = prev / current;
                break;
            default:
                return;
        }

        return result.toString();
    }

    function updateDisplay(value) {
        display.textContent = value;
    }
});
