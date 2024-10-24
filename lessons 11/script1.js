//Вивести таблицю Піфагора (10×10), таблиця повинна бути створена динамічно

const root = document.querySelector("#root");
const cols = 11;
const rows = 11;

const tb = document.createElement("table");

for (let nr = 1; nr < rows; nr++) {
    const row = document.createElement("tr");

  for (let nc = 1; nc < cols; nc++) {
    const cell = document.createElement(nr === 1 || nc === 1 ? "th" : "td");

    cell.textContent = (nr === 0 || nc === 0 ? nr+nc : nc*nr);

    row.append(cell);
  }

  tb.append(row);
}

root.append(tb);
