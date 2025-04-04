const Ship = require("../Game logic/objects");
// const Gameboard = require("../Game logic/objects");
// const Player = require("../Game logic/objects");

describe("Ships should have a length, ability to take damage and get sunk when the damage becomes too much", () => {
    let ship;
    beforeEach(() => {
        ship = new Ship(3);
    });

    test("check that the ship can take damage", () => {
        ship.hit();
        ship.hit();
        expect(ship.hit_taken).toBe(2);
    });

    test("check that the ship has a max damage it can take", () => {
        ship.hit();
        ship.hit();
        ship.hit();
        ship.hit();
        ship.hit();
        expect(ship.hit_taken).toBe(3);
    });    

    test("check that the ship can be sunk", () => {
        ship.hit();
        ship.hit();
        ship.hit();
        expect(ship.sunk).toBeTruthy();
    });
})