import "../styles.css";
import formSubmit from "./event functions/formSubmit";
import { howToPlayOpen, howToPlayClose } from "./event functions/howToPlay";

const how_to_play_open_btn = document.querySelector(".open-how-to-play");
const how_to_play_close_btn = document.querySelector(".close-btn");

how_to_play_open_btn.addEventListener("click", howToPlayOpen);
how_to_play_close_btn.addEventListener("click", howToPlayClose);

const form = document.querySelector(".player-name-form");

form.addEventListener("submit", formSubmit);
