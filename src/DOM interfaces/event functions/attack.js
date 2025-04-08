import { visualize } from "../deploymentVisualization";
import { getCellCoordinate } from "./shipDeployment";

export function attack(e, player, ui) {
    let cell_coordinate = getCellCoordinate(e),
        success = player.gameboard.receiveAttack(cell_coordinate);
    
    if (success === 0) {
        let isHidden = false
        if (player.name === "Computer") isHidden = true
        visualize(player.gameboard, ui, isHidden);
    }
}

function checkSunk() {

}