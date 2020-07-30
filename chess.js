function chess(num) {

    let $chess = document.getElementById("chess");
    let $table = document.createElement("table");

    // массив координат столбцов
    let rows = ["a", "b", "c", "d", "e", "f", "g", "h"];

    for (let i = 0; i <= num; i++) {
        let $tr = document.createElement("tr");
        for (let j = 0; j <= num; j++) {
            let $td = document.createElement("td");
            // выводим координаты колонок в последней строке таблицы
            if (i == num && j > 0) {
                $td.classList.add("coordinates");
                $td.textContent = rows[j - 1];
                // выводим координаты строк в первой колонке таблицы
            } else if (i != num && j == 0) {
                $td.classList.add("coordinates");
                $td.textContent = num - i;
                // раскрасим ячейки основного поля.
            } else if (i != num) {
                if ((i + j) % 2 == 0) {
                    $td.classList.add("white");
                } else {
                    $td.classList.add("black");
                }
            }

            $tr.appendChild($td);
        }
        $table.appendChild($tr);
    }

    $chess.appendChild($table);
}

// вывод шахматной доски 8х8
chess(8);
