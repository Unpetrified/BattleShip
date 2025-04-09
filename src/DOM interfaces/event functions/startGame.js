import { updatePlayer } from "../playerBoardUpdate";
import { closeBD } from "./backDrop";
import { enableBoards } from "./gameOver";
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

    updatePlayer(playerOne, "one", false);
    initializeComputer(computer);
    updatePlayer(computer, "two", false);

    enableBoards();
}

function checkDeploymentStatus() {
    const ships = document.querySelectorAll(".ship");
    const deployed_ships = document.querySelectorAll(".ships .deactivate");
    return ships.length === deployed_ships.length
}

export function initializeComputer(computer) {
    randomDeploy(computer, "two", true);
}