import { visualize } from "../deploymentVisualization";

export function randomDeploy(player, board, hidden) {

    clearUiBoard(board);
    clearBoard(player);

    let ships = [
        {"length" : 5, "name" : "carrier"},
        {"length" : 4, "name" : "battleship"},
        {"length" : 3, "name" : "cruiser"},
        {"length" : 3, "name" : "submarine"},
        {"length" : 2, "name" : "destroyer"},
    ]

    let ships_deployed = 0,
        gameboard = player.gameboard;

    while (ships_deployed < 5) {
        let length = ships[0]["length"],
            name = ships[0]["name"],
            start_position = getCoordinate(),
            orientation = getRandomOrientation(),
            success = gameboard.placeShip(length, name, start_position, orientation);
    
        if (success === 0) {
            ships_deployed++;
            ships.shift();
            visualize(gameboard, "board", hidden);
        }
    }

    let ui_ships = document.querySelectorAll(".ship");
    ui_ships.forEach(ship => {
        ship.classList.add("deactivate");
        ship.classList.remove("selected");
    });
}

function getRandomOrientation() {
    let i = Math.random()*100;
    return (i>50) ? "H" : "V"
}

// generate a two item array containing numbers b/w 0-9
function getCoordinate() {
    let row = Math.floor(Math.random() * 10),
        col = Math.floor(Math.random() * 10);
    let coor = [col, row];
    return coor
}

// clear ui cells 
function clearUiBoard(board) {
    const ui_cells = document.querySelectorAll(`.${board} .col`);
    ui_cells.forEach(cell => {
        cell.classList.remove("black");
    })
}

// clear player board
function clearBoard(player) {
    player.gameboard.resetBoard();
}