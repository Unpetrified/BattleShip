import { visualize } from "./deploymentVisualization";

export function updatePlayer(player, ui_board, hidden, target) {
    updatePlayerUiName(player, ui_board);
    updatePlayerUiScore(player, target);
    visualize(player.gameboard, ui_board, hidden);
}

function updatePlayerUiName(player, ui_board) {
    const player_name_ui = document.querySelector(`.${ui_board} .section-heading`);
    player_name_ui.textContent = player.name;
}

function updatePlayerUiScore(player, target) {
    const player_score_ui = document.querySelector(`.${target}`);
    player_score_ui.textContent = player.score;
}