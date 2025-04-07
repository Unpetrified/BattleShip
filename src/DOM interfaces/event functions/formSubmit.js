import { openBD } from "./backDrop";

export default function formSubmit(e) {
    e.preventDefault();
    // const start_page = document.querySelector(".start-page");
    const place_ships = document.querySelector(".placeships");
    place_ships.classList.remove("display-off");
    openBD();
}