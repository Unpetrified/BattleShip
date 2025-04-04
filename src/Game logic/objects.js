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
    constructor(hi) {

    }
}

class Player {
    constructor(name) {

    }
}

module.exports = Ship