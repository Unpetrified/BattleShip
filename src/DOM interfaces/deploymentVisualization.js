export function visualize(gameboard, pos) {
    let x = 0,
        y = 0;

    while (true) {
        if(x === 10) break
        
        let cell = gameboard.board[y][x],
            ui_cell = document.querySelector(`.${pos} .row[data-row="${x+1}"] .col[data-col="${y+1}"]`);

        if (cell !== 0) ui_cell.classList.add("black");

        y++;
        if(y === 10) {
            x++;
            y = 0;
        }
    }
}