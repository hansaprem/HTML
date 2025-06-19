const display = document.getElementById('display');
const historyList = document.getElementById('historyList');

function appendValue(val) {
  display.value += val;
}

function clearDisplay() {
  display.value = '';
}

function deleteLast() {
  display.value = display.value.slice(0, -1);
}

function calculateResult() {
  try {
    const expression = display.value;
    const result = eval(expression);
    const entry = `${expression} = ${result}`; // ✅ fixed here
    display.value = result;
    saveToHistory(entry);
    renderHistory();
  } catch (error) {
    alert("Invalid Expression");
  }
}

function saveToHistory(entry) {
  let history = JSON.parse(localStorage.getItem("calcHistory")) || [];
  history.unshift(entry);
  if (history.length > 25) history.pop(); // Limit to 25 entries
  localStorage.setItem("calcHistory", JSON.stringify(history));
}

function renderHistory() {
  const history = JSON.parse(localStorage.getItem("calcHistory")) || [];
  historyList.innerHTML = "";
  history.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    historyList.appendChild(li);
  });
}

function clearHistory() {
  localStorage.removeItem("calcHistory");
  renderHistory();
}

window.onload=renderHistory;
