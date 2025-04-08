const {Ship, Gameboard} = require("../Game logic/objects");

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
});

describe("Add a ship at a given location, give it damage if hit and update the board when a player makes any attack", () => {
    let gameboard;
    beforeEach(() => {
        gameboard = new Gameboard();
    });

    test("check that a ship can be placed vertically", () => {
        let ship = new Ship(4);
        let expectedBoard = [
            //0,1,2,3,4,5,6,7,8,9
             [0,0,0,0,0,0,0,0,0,0], //0
             [0,0,0,0,0,0,0,0,0,0], //1
             [0,0,0,0,0,0,0,0,0,0], //2
             [0,0,0,0,0,0,0,0,0,0], //3
             [0,0,0,0,0,0,0,0,0,0], //4
             [0,ship,0,0,0,0,0,0,0,0], //5
             [0,ship,0,0,0,0,0,0,0,0], //6
             [0,ship,0,0,0,0,0,0,0,0], //7
             [0,ship,0,0,0,0,0,0,0,0], //8
             [0,0,0,0,0,0,0,0,0,0], //9
         ];
        gameboard.placeShip(4,"ship",[1,5], "V");
        expect(gameboard.board).toEqual(expectedBoard)
    });

    test("check that a ship can be placed horizontally", () => {
        let ship = new Ship(3);
        let expectedBoard = [
            //0,1,2,3,4,5,6,7,8,9
             [0,0,0,0,0,0,0,0,0,0], //0
             [0,0,0,0,0,0,0,0,0,0], //1
             [0,0,0,0,0,0,0,0,0,0], //2
             [0,0,0,0,0,0,0,0,0,0], //3
             [0,0,0,0,0,0,0,0,0,0], //4
             [0,ship,ship,ship,0,0,0,0,0,0], //5
             [0,0,0,0,0,0,0,0,0,0], //6
             [0,0,0,0,0,0,0,0,0,0], //7
             [0,0,0,0,0,0,0,0,0,0], //8
             [0,0,0,0,0,0,0,0,0,0], //9
         ];
        gameboard.placeShip(3, "ship",[1,5], "H");
        expect(gameboard.board).toEqual(expectedBoard)
    });

    test("check that multiple ships can be placed", () => {
        let ship1 = new Ship(3);
        let ship2 = new Ship(4);
        let ship3 = new Ship(2);
        let ship4 = new Ship(5);
        let ship5 = new Ship(3);
        let expectedBoard = [
            //0,1,2,3,4,5,6,7,8,9
             [0,0,0,ship3,0,0,0,0,0,ship4], //0
             [0,0,0,ship3,0,0,0,0,0,ship4], //1
             [0,0,0,ship5,ship5,ship5,0,0,0,ship4], //2
             [0,0,0,0,0,0,0,0,0,ship4], //3
             [0,0,0,0,0,0,0,0,0,ship4], //4
             [0,ship1,ship1,ship1,0,0,0,0,0,0], //5
             [0,0,0,0,0,0,0,0,0,0], //6
             [0,0,0,0,0,0,0,0,0,0], //7
             [0,0,0,0,ship2,ship2,ship2,ship2,0,0], //8
             [0,0,0,0,0,0,0,0,0,0], //9
         ];
        gameboard.placeShip(2, "ship", [3, 0], "V");
        gameboard.placeShip(3, "ship", [1, 5], "H");
        gameboard.placeShip(3, "ship", [3, 2], "H");
        gameboard.placeShip(4, "ship", [4, 8], "H");
        gameboard.placeShip(5, "ship", [9, 0], "V");
        expect(gameboard.board).toEqual(expectedBoard)
    });

    test("check that a ship will not be placed when the location given is beyond the gameboard", () => {
        let expectedBoard = [
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
         ];
        gameboard.placeShip(3, "ship", [8,5], "H");
        expect(gameboard.board).toEqual(expectedBoard)
    });  

    test("check that a ship will not be placed if it intersects another ship", () => {
        let ship = new Ship(3);
        let expectedBoard = [
            //0,1,2,3,4,5,6,7,8,9
             [0,0,0,0,0,0,0,0,0,0], //0
             [0,0,0,0,0,0,0,0,0,0], //1
             [0,0,0,0,0,0,0,0,0,0], //2
             [0,0,0,0,0,0,0,0,0,0], //3
             [0,0,0,0,0,0,0,0,0,0], //4
             [0,ship,ship,ship,0,0,0,0,0,0], //5
             [0,0,0,0,0,0,0,0,0,0], //6
             [0,0,0,0,0,0,0,0,0,0], //7
             [0,0,0,0,0,0,0,0,0,0], //8
             [0,0,0,0,0,0,0,0,0,0], //9
         ];
        gameboard.placeShip(3, "ship", [1,5], "H");
        gameboard.placeShip(3, "ship", [1,4], "V");
        expect(gameboard.board).toEqual(expectedBoard)
    });  
    
    test("check that a ship can take damage if hit", () => {
        let ship = new Ship(3);
        ship.hit();
        gameboard.placeShip(3, "ship", [1,5], "H");
        gameboard.receiveAttack([2,5]);
        let expectedBoard = [
            //0,1,2,3,4,5,6,7,8,9
             [0,0,0,0,0,0,0,0,0,0], //0
             [0,0,0,0,0,0,0,0,0,0], //1
             [0,0,0,0,0,0,0,0,0,0], //2
             [0,0,0,0,0,0,0,0,0,0], //3
             [0,0,0,0,0,0,0,0,0,0], //4
             [0,ship,[ship],ship,0,0,0,0,0,0], //5
             [0,0,0,0,0,0,0,0,0,0], //6
             [0,0,0,0,0,0,0,0,0,0], //7
             [0,0,0,0,0,0,0,0,0,0], //8
             [0,0,0,0,0,0,0,0,0,0], //9
        ];
        expect(gameboard.board).toEqual(expectedBoard);
    });

    test("update the board for missed hits", () => {
        let ship = new Ship(1);
        gameboard.placeShip(1, "ship", [8,5], "H");
        gameboard.receiveAttack([2,5]);
        let expectedBoard = [
            //0,1,2,3,4,5,6,7,8,9
             [0,0,0,0,0,0,0,0,0,0], //0
             [0,0,0,0,0,0,0,0,0,0], //1
             [0,0,0,0,0,0,0,0,0,0], //2
             [0,0,0,0,0,0,0,0,0,0], //3
             [0,0,0,0,0,0,0,0,0,0], //4
             [0,0,-1,0,0,0,0,0,ship,0], //5
             [0,0,0,0,0,0,0,0,0,0], //6
             [0,0,0,0,0,0,0,0,0,0], //7
             [0,0,0,0,0,0,0,0,0,0], //8
             [0,0,0,0,0,0,0,0,0,0], //9
        ];
        expect(gameboard.board).toEqual(expectedBoard);
    });

    test("ensure no location can be hit twice", () => {
        let ship = new Ship(1);
        gameboard.placeShip(1, "ship", [8,5], "H");
        gameboard.receiveAttack([2,5]);
        gameboard.receiveAttack([7,3]);
        gameboard.receiveAttack([2,5]);
        let expectedBoard = [
            //0,1,2,3,4,5,6,7,8,9
             [0,0,0,0,0,0,0,0,0,0], //0
             [0,0,0,0,0,0,0,0,0,0], //1
             [0,0,0,0,0,0,0,0,0,0], //2
             [0,0,0,0,0,0,0,-1,0,0], //3
             [0,0,0,0,0,0,0,0,0,0], //4
             [0,0,-1,0,0,0,0,0,ship,0], //5
             [0,0,0,0,0,0,0,0,0,0], //6
             [0,0,0,0,0,0,0,0,0,0], //7
             [0,0,0,0,0,0,0,0,0,0], //8
             [0,0,0,0,0,0,0,0,0,0], //9
        ];
        expect(gameboard.board).toEqual(expectedBoard);
    });

})