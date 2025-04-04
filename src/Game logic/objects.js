class Ship {
    constructor(length) {
        this.length = length;
        this.hit_taken = 0;
        this.sunk = false;
    }

    hit() {
        if (this.hit_taken < this.length) this.hit_taken++;
        this.isSunk()
    }

    isSunk() {
        if (this.hit_taken >= this.length) this.sunk = true;
    }
}

class Gameboard {
    constructor() {
        this.board = [
           //0,1,2,3,4,5,6,7,8,9
            [0,0,0,0,0,0,0,0,0,0], //0
            [0,0,0,0,0,0,0,0,0,0], //1
            [0,0,0,0,0,0,0,0,0,0], //2
            [0,0,0,0,0,0,0,0,0,0], //3
            [0,0,0,0,0,0,0,0,0,0], //4
            [0,0,0,0,0,0,0,0,0,0], //5
            [0,0,0,0,0,0,0,0,0,0], //6
            [0,0,0,0,0,0,0,0,0,0], //7
            [0,0,0,0,0,0,0,0,0,0], //8
            [0,0,0,0,0,0,0,0,0,0], //9
        ]
    }

    placeShip(ship_length, start_position,orientation) {
        
        let ship = new Ship(ship_length);

        let x = start_position[0],
            y = start_position[1],
            start = x;

        if (orientation === "V") start = y

        let stop_position = start + ship_length-1;
    
        // check that ship can be placed from start position
        //  to the ships length in the given orientation
        if (stop_position >= this.board[0].length) return

        let i = start;

        // place ship from the given coordinate
        while (true) {
            if (orientation === "H") this.board[y][i] = ship;
            else this.board[i][x] = ship
            
            if (i === stop_position) break
            i++;
        }

    }
}

class Player {
    constructor(name) {

    }
}

let gameboard = new Gameboard();
gameboard.placeShip(3,[1,5], "V");

module.exports = {Ship, Gameboard, Player}