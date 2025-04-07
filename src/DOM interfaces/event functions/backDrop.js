const back_drop = document.querySelector(".blanket");

export function openBD() {
    back_drop.classList.remove("display-off");
    document.body.classList.add("no-scroll");
}

export function closeBD() {
    back_drop.classList.add("display-off");
    document.body.classList.remove("no-scroll");
}