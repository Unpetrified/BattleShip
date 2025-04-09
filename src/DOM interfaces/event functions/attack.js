import { visualize } from "../deploymentVisualization";
import { updateShipUiStatus } from "../playerBoardUpdate";
import { gameOver } from "./gameOver";
import { getCellCoordinate } from "./shipDeployment";

export function attack(e, computer, ui, player) {
    let cell_coordinate = getCellCoordinate(e),
        success = computer.gameboard.receiveAttack(cell_coordinate);
    
    if (success >= 0) {
        if (success === 1) {
            let status = checkSunk(computer, cell_coordinate);
            
            if (status["isSunk"]) {
                updateShipUiStatus(status, ui)
                gameOver(player, computer);
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