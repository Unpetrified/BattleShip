import { updatePlayer } from "../playerBoardUpdate";
import { closeBD } from "./backDrop";
import { randomDeploy } from "./randomShipDeployment";

export function startGame(playerOne, computer) {
    if (!checkDeploymentStatus()) {
        alert("All ships must be deployed before the game can begin.")
        return
    }
    const start_page = document.querySelector(".start-page");
    start_page.classList.add("display-off");
    closeBD();

    const game = document.querySelector(".game");
    game.classList.remove("display-off");

    updatePlayer(playerOne, "player-one-board", false, "player-one-score");
    initializeComputer(computer);
    updatePlayer(computer, "player-two-board", true, "player-two-score");
}

function checkDeploymentStatus() {
    const ships = document.querySelectorAll(".ship");
    const deployed_ships = document.querySelectorAll(".deactivate");
    return ships.length === deployed_ships.length
}

function initializeComputer(computer) {
    randomDeploy(computer, "player-two-board");
}