class Ship {
    constructor(length, name="ship") {
        this.length = length;
        this.name = name;
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
    // start position is provided as [col, row]
    /**
     * Takes given parameters, creates a ship and deploys it on the board using the orientation and position given.
     * @param {"Ship Length"} ship_length
     * @param {"Ship name"} name
     * @param {"[col,row]"} start_position
     * @param {'"H" for Horizontal, "V" for Vertical'} orientation
     */
    placeShip(ship_length, name, start_position,orientation) {
        
        let ship = new Ship(ship_length, name);

        let row = start_position[0],
            col = start_position[1],
            start = row;

        if (orientation === "V") start = col

        let stop_position = start + ship_length-1;
    
        // check that ship can be placed from start position
        //  to the ships length in the given orientation
        if (stop_position >= this.board[0].length) return -1

        // check for ships along the specified path
        let j = start
        while (true) {
            if (orientation === "H") {
                if (this.board[col][j] !== 0) return -1
            } else {
                if (this.board[j][row] !== 0) return -1
            }

            if(j === stop_position) break
            j++;
        }

        let i = start;
        
        // place ship from the given coordinate
        while (true) {
            if (orientation === "H") this.board[col][i] = ship;
            else this.board[i][row] = ship
            
            if (i === stop_position) break
            i++;
        }

        return 0

    }

    // return -1 if the attack could not be carried out due to wrong coordinates
    // or the location been hit already
    // return 0 for a successful hit or miss
    receiveAttack(coordinate) {
        let x = coordinate[0],
            y = coordinate[1],
            location = this.board[y][x];
        
        // check that the coordinate is on the board
        if (x >= this.board.length || y >= this.board.length ) return -1

        // check if the location has been hit
        if (location === -1 || Array.isArray(location)) return -1

        // missed attack
        if (location === 0) {
            this.board[y][x] = -1;
            return 0
        }

        // location is a reference to a ship
        this.board[y][x] = [location];
        location.hit(); // send damage to the ship

        return 0
    }

    resetBoard() {
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
}

class Player {
    constructor(name) {
        this.name = name;
        this.gameboard = new Gameboard();
        this.score = 0;
    }

    updateScore() {
        this.score++;
    }

    reset() {
        this.gameboard = new Gameboard();
        this.score = 0;
    }

}

module.exports = {Ship, Gameboard, Player}