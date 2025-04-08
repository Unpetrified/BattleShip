import { visualize } from "../deploymentVisualization";

export function deploy(e, player) {
    let ship_to_deploy = getSelectedShip();
    if(ship_to_deploy === null) return    
    
    let ship_length = getShipLength(ship_to_deploy),
        ship_name = getShipName(ship_to_deploy),
        start_position = getCellCoordinate(e),
        orientation = getShipOrientation(ship_to_deploy);
    
    let gameboard = player.gameboard;
    
    let success = gameboard.placeShip(ship_length, ship_name, start_position, orientation);
    
    if (success === -1) return
    
    visualize(gameboard, "board");

    ship_to_deploy.classList.remove("selected");
    ship_to_deploy.classList.add("deactivate");
}
// rewrite

function getSelectedShip() {
    let ship_returned = document.querySelector(".selected");

    return ship_returned
}

function getCellCoordinate(e) {
    let row = Number.parseInt(e.currentTarget.parentNode.getAttribute("data-row"))-1,
        col = Number.parseInt(e.currentTarget.getAttribute("data-col"))-1;
    return [col, row]
}

function getShipLength(ship) {
    let ship_length = Number.parseInt(ship.getAttribute("data-length"));
    return ship_length
}

function getShipName(ship) {
    let ship_name = ship.getAttribute("data-name");
    return ship_name
}

function getShipOrientation(ship) {
    return ship.nextElementSibling.value
}

export function selectShip(e) {
    let ships = document.querySelectorAll(".ship");
    ships.forEach(ship => {
        ship.classList.remove("selected");
    });
    e.target.classList.add("selected");
}