import { Player } from "../Game logic/objects";
import "../styles.css";
import formSubmit from "./event functions/formSubmit";
import { howToPlayOpen, howToPlayClose } from "./event functions/howToPlay";
import { deploy, selectShip } from "./event functions/shipDeployment";
import { startGame } from "./event functions/startGame";

let player = new Player("");

const how_to_play_open_btn = document.querySelector(".open-how-to-play");
how_to_play_open_btn.addEventListener("click", howToPlayOpen);

const how_to_play_close_btn = document.querySelector(".close-btn");
how_to_play_close_btn.addEventListener("click", howToPlayClose);

const form = document.querySelector(".player-name-form");
form.addEventListener("submit", (e) => formSubmit(e, player));

const start_btn = document.querySelector(".start-game");
start_btn.addEventListener("click", () => startGame(player));

let ships = document.querySelectorAll(".ship");
ships.forEach(ship => {
    ship.addEventListener("click", selectShip)
});

const cells = document.querySelectorAll(".board .col");
cells.forEach(cell => {
    cell.addEventListener("click", (e) => deploy(e, player));
})