const num1Input = document.getElementById('num1');
const num2Input = document.getElementById('num2');
const operationBtns = document.querySelectorAll('.operation-btn');
const calculateButton = document.getElementById('calculate');
const calculatorTable = document.getElementById('calculatorTable').querySelector('tbody');
const operationsChart = document.getElementById('operationsChart');

// Chart.js setup (initialize with default data)
let chart = new Chart(operationsChart, {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: 'Operations per 10 Seconds',
      data: [], 
      borderColor: 'blue',
      borderWidth: 1
    }]
  }
});

let operationsPerMinute = [1]; 
let lastMinute = new Date(); 
let selectedOperation; 

// Add event listener to each operation button
operationBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    selectedOperation = btn.textContent;
    alert(`You selected the ${selectedOperation} operation.`);
  });
});

calculateButton.addEventListener('click', () => {
  const num1 = parseFloat(num1Input.value);
  const num2 = parseFloat(num2Input.value);

  if (isNaN(num1) || isNaN(num2)) {
    alert("Please enter valid numbers.");
    return;
  }

  if (!selectedOperation) {
    alert("Please select an operation.");
    return;
  }

  let result;
  switch (selectedOperation) {
    case "+":
      result = num1 + num2;
      break;
    case "-":
      result = num1 - num2;
      break;
    case "*":
      result = num1 * num2;
      break;
    case "/":
      if (num2 === 0) {
        alert("Cannot divide by zero.");
        return;
      }
      result = num1 / num2;
      break;
  }

  // Update table with new calculation
  const newRow = calculatorTable.insertRow();
  newRow.insertCell().textContent = num1;
  newRow.insertCell().textContent = selectedOperation;
  newRow.insertCell().textContent = num2;
  newRow.insertCell().textContent = result;

  // Update chart data
  updateChart(result);

  // Clear input fields for next calculation
  num1Input.value = '';
  num2Input.value = '';
  selectedOperation = null; 
});

function updateChart(result) {
  const currentMinute = new Date();
  if (currentMinute.getMinutes()!== lastMinute.getMinutes()) {
    lastMinute = currentMinute;
    operationsPerMinute.push(0);
  }
  operationsPerMinute[operationsPerMinute.length - 1]++; 

  // Update chart data and labels
  chart.data.labels = operationsPerMinute.map((_, i) => i + 1); 
  chart.data.datasets[0].data = operationsPerMinute;
  chart.update();
}

// Update chart every 10 seconds
setInterval(() => {
  updateChart(0); 
}, 10000);