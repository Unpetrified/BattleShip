import { openBD } from "./backDrop";

export default function formSubmit(e, player) {
    e.preventDefault();

    const place_ships = document.querySelector(".placeships");
    place_ships.classList.remove("display-off");

    openBD();

    const player_name = document.querySelector(".name").value;
    player.name = player_name;
}