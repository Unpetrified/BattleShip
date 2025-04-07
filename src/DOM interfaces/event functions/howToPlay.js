import { openBD, closeBD } from "./backDrop";

const how_to_play = document.querySelector(".how-to-play");

export function howToPlayOpen() {
    how_to_play.classList.remove("display-off");
    openBD();
}

export function howToPlayClose() {
    how_to_play.classList.add("display-off");
    closeBD();
}