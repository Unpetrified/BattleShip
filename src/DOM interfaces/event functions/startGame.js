import { closeBD } from "./backDrop";

export function startGame() {
    if (!checkDeploymentStatus()) {
        alert("All ships must be deployed before the game can begin.")
        return
    }
    const start_page = document.querySelector(".start-page");
    start_page.classList.add("display-off");
    closeBD();

    const game = document.querySelector(".game");
    game.classList.remove("display-off");
}

function checkDeploymentStatus() {
    const ships = document.querySelectorAll(".ship");
    const deployed_ships = document.querySelectorAll(".deactivate");
    return ships.length === deployed_ships.length
}