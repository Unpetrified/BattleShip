import { visualize } from "./deploymentVisualization";

export function updatePlayer(player, board, hidden) {
    updatePlayerUiName(player, board);
    updatePlayerUiScore(player, board);
    visualize(player.gameboard, board, hidden);
}

function updatePlayerUiName(player, ui_board) {
    const player_name_ui = document.querySelector(`.player-${ui_board}-board .section-heading`);
    player_name_ui.textContent = player.name;
}

export function updatePlayerUiScore(player, target) {
    const player_score_ui = document.querySelector(`.player-${target}-score`);
    player_score_ui.textContent = player.score;
}

export function updateShipUiStatus(ship, target) {
    const player_ship_ui_status = document.querySelector(`.player-${target}-ship-status .${ship["ship"]} span`);
    if (ship["isSunk"]) {
        player_ship_ui_status.textContent = "Sunk";
        player_ship_ui_status.className = "sunk";
    } else {
        player_ship_ui_status.textContent = "Afloat";
        player_ship_ui_status.className = "afloat";
    }
}

