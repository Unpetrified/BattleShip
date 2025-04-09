import { visualize } from "../deploymentVisualization";
import { updatePlayerUiScore, updateShipUiStatus } from "../playerBoardUpdate";
import { openBD } from "./backDrop";
import { getCellCoordinate } from "./shipDeployment";
import { initializeComputer } from "./startGame";

export function attack(e, computer, ui, player) {
    let cell_coordinate = getCellCoordinate(e),
        success = computer.gameboard.receiveAttack(cell_coordinate);
    
    if (success >= 0) {
        if (success === 1) {
            let status = checkSunk(computer, cell_coordinate);
            
            if (status["isSunk"]) {
                updateShipUiStatus(status, ui)
                gameOver(computer, player);
            }
        }

        let isHidden = false
        if (computer.name === "Computer") isHidden = true
        visualize(computer.gameboard, ui, isHidden);
    }
}

function checkSunk(player, coordinate) {
    let col = coordinate[0],
        row = coordinate[1],
        ship_hit = player.gameboard.board[row][col][0];

    return {"ship":ship_hit.name, "isSunk":ship_hit.isSunk()}
}

function gameOver(computer, player) {
    if (computer.gameboard.shipSunk()) {
        computer.updateScore();
        updatePlayerUiScore(computer, "one");
        startNewRound(computer, player);
    }
}

function startNewRound(computer, player) {
    /**
     * clear player one and two ui and class board
     * open pop up for ship placement module
     * clear deployment board
     * remove deactivate from all ships
     */
    
    // reset player one and two class board
    player.gameboard.resetBoard(); 
    computer.gameboard.resetBoard(); 

    // reset player one and two ui board
    visualize(player.gameboard, "one");
    visualize(computer.gameboard, "two");
    console.log("Reset")
    return
    // pop up ship placement module
    const start_page = document.querySelector(".start-page");
    start_page.classList.remove("display-off");
    openBD();

    //reset deployment board
    visualize(player.gameboard, "board");

    //remove deactivate from all ships
    let ships = document.querySelectorAll(".ship");
    ships.forEach(ship => {
        ship.classList.remove("deactivate");
        ship.classList.remove("selected");
    });

}