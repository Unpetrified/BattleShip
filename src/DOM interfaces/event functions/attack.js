import { visualize } from "../deploymentVisualization";
import { updateShipUiStatus } from "../playerBoardUpdate";
import { gameOver } from "./gameOver";
import { getRandomCoordinate } from "./randomShipDeployment";
import { getCellCoordinate } from "./shipDeployment";

/**
 * @param {"event"} e 
 * @param {"Player being attacked"} player_to_attack 
 * @param {"board of player being attacked"} ui 
 * @param {"Player attacking"} player_attacking 
 */
export function attack(e, player_to_attack, ui, player_attacking) {
    let cell_coordinate, success;
    
    // get coordinate and attack the location
    if (player_attacking.name === "Computer") {
        cell_coordinate = getRandomCoordinate();
        success = player_to_attack.gameboard.receiveAttack(cell_coordinate);

        while(success === -1) { // ensure a successful hit is carried out
            cell_coordinate = getRandomCoordinate(), 
            success = player_to_attack.gameboard.receiveAttack(cell_coordinate); 
        }

    } else {
        cell_coordinate = getCellCoordinate(e);
        success = player_to_attack.gameboard.receiveAttack(cell_coordinate);
    }

    if (success >= 0) {
        if (success === 1) {
            let status = checkSunk(player_to_attack, cell_coordinate);
            
            if (status["isSunk"]) {
                updateShipUiStatus(status, ui)
                gameOver(player_attacking, player_to_attack);
            }
        }

        let isHidden = false
        if (player_to_attack.name === "Computer") isHidden = true
        visualize(player_to_attack.gameboard, ui, isHidden);
    }
}

function checkSunk(player, coordinate) {
    let col = coordinate[0],
        row = coordinate[1],
        ship_hit = player.gameboard.board[row][col][0];

    return {"ship":ship_hit.name, "isSunk":ship_hit.isSunk()}
}