export function visualize(gameboard, pos) {
    let row = 0,
        col = 0;

    while (true) {
        if(row === 10) break
        
        let cell = gameboard.board[row][col],
            ui_cell = document.querySelector(`.${pos} .row[data-row="${row+1}"] .col[data-col="${col+1}"]`);

        if (cell !== 0) ui_cell.classList.add("black");

        col++;
        if(col === 10) {
            row++;
            col = 0;
        }
    }
}
// rewrite