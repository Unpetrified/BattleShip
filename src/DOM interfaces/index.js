import "../styles.css";
import { Player } from "../Game logic/objects";
import formSubmit from "./event functions/formSubmit";
import { howToPlayOpen, howToPlayClose } from "./event functions/howToPlay";
import { randomDeploy } from "./event functions/randomShipDeployment";
import { deploy, selectShip } from "./event functions/shipDeployment";
import { startGame } from "./event functions/startGame";
import { attack } from "./event functions/attack";

let player = new Player(""),
    computer = new Player("Computer");

const how_to_play_open_btn = document.querySelector(".open-how-to-play");
how_to_play_open_btn.addEventListener("click", howToPlayOpen);

const how_to_play_close_btn = document.querySelector(".how-to-play .close-btn");
how_to_play_close_btn.addEventListener("click", howToPlayClose);

const form = document.querySelector(".player-name-form");
form.addEventListener("submit", (e) => formSubmit(e, player));

let ships = document.querySelectorAll(".ship");
ships.forEach(ship => {
    ship.addEventListener("click", selectShip)
});

const cells = document.querySelectorAll(".board .col");
cells.forEach(cell => {
    cell.addEventListener("click", (e) => deploy(e, player));
});

const start_btn = document.querySelector(".start-game");
start_btn.addEventListener("click", () => startGame(player, computer));

const random_btn = document.querySelector(".random-btn");
random_btn.addEventListener("click", () => randomDeploy(player, "board"));

const reset = document.querySelector(".reset");
reset.addEventListener("click",e => {
    location.reload();
})

const player_cells = document.querySelectorAll(".player-two-board .col");
player_cells.forEach(cell => {
    cell.addEventListener("click", (e) => attack(e, computer, "two", player));
});