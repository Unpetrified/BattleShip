import { Gameboard } from "../Game logic/objects";

/**
 * 
 * @param {Gameboard} gameboard 
 * @param {"board, one or two"} pos 
 * @param {"false by default"} hidden 
 */
export function visualize(gameboard, pos, hidden=false) {
    let row = 0,
        col = 0;
    
    if (pos !== "board") pos = `player-${pos}-board`;


    // loop through player board
    // add grey for deployed ship at location
    // 💧 for -1 location
    // 🔥 for [ship] location
    while (true) {
        if(row === 10) break
        
        let cell = gameboard.board[row][col],
            ui_cell = document.querySelector(`.${pos} .row[data-row="${row+1}"] .col[data-col="${col+1}"]`);

        if (cell !== 0 && cell !== -1 && !hidden) ui_cell.classList.add("black"); // show ship at location 
        if (cell === -1 ) ui_cell.textContent = "💧"; // show missed hits
        if (Array.isArray(cell)) ui_cell.textContent = "🔥"; // show successul hits

        col++;
        if(col === 10) {
            row++;
            col = 0;
        }
    }
}