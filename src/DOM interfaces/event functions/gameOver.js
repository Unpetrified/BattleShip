import { visualize } from "../deploymentVisualization";
import { updatePlayerUiScore } from "../playerBoardUpdate";
import { closeBD, openBD } from "./backDrop";

export function gameOver(playerOne, playerTwo) {
    
    if (playerTwo.gameboard.allShipsSunk()) {
        playerOne.updateScore();

        updatePlayerUiScore(playerOne, "one");

        disableBoards(); // disable player boards
        
        rematchOption(playerOne, playerTwo); //display rematch option to player

    }
}

function disableBoards() {
    const playerOneBoard = document.querySelectorAll(".player-one-board .row");
    playerOneBoard.forEach(row => {
        row.classList.add("deactivate");
    });

    const playerTwoBoard = document.querySelectorAll(".player-two-board .row");
    playerTwoBoard.forEach(row => {
        row.classList.add("deactivate");
    })

}

export function enableBoards() {
    const playerOneBoard = document.querySelectorAll(".player-one-board .row");
    playerOneBoard.forEach(row => {
        row.classList.remove("deactivate");
    });

    const playerTwoBoard = document.querySelectorAll(".player-two-board .row");
    playerTwoBoard.forEach(row => {
        row.classList.remove("deactivate");
    })

}

function rematchOption(playerOne, playerTwo) {
    openBD();
    const winner = document.querySelector(".winner");
    winner.textContent = playerOne.name;

    const rematch = document.querySelector(".rematch");
    rematch.classList.remove("display-off");

    const close_btn = document.querySelector(".rematch .close-btn");
    close_btn.addEventListener("click", () => {
        rematch.classList.add("display-off");
        closeBD();
    });

    const rematch_btn = document.querySelector(".rematch-btn");
    rematch_btn.addEventListener("click", () => startNewRound(playerOne, playerTwo));
}

function startNewRound(playerOne, playerTwo) {
    /**
   * clear player one and two ui and class board
   * open pop up for ship placement module
   * clear deployment board
   * remove deactivate from all ships
   */

    // close rematch dialogue
    const rematch = document.querySelector(".rematch");
    rematch.classList.add("display-off");
    
  // reset player one and two class board
  playerOne.gameboard.resetBoard(); 
  playerTwo.gameboard.resetBoard(); 
  
  // reset player one and two ui board
  visualize(playerOne.gameboard, "one", false, true);
  visualize(playerTwo.gameboard, "two", false, true);

  // pop up ship placement module
  const start_page = document.querySelector(".start-page");
  start_page.classList.remove("display-off");
  openBD();
  
  //reset deployment board
  visualize(playerOne.gameboard, "board", false, true);

  //remove deactivate from all ships
  let ships = document.querySelectorAll(".ship");
  ships.forEach(ship => {
      ship.classList.remove("deactivate");
      ship.classList.remove("selected");
  });
    
}
