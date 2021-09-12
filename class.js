class Grass {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.multiply = 0;
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1], 
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    chooseCell(character) {
        let found = [];
        for (const i in this.directions) {
            let x = this.directions[i][0];
            let y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[x][y] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found
    }

    mul() {
        this.multiply++; 
        let emptyCell = this.chooseCell(0); 
        let newCell = emptyCell[Math.floor(Math.random() * emptyCell.length)]; 
        if (newCell && this.multiply >= 5) {
            let newX = newCell[0]; 
            let newY = newCell[1]; 
            matrix[newX][newY] = 1;
            let newGrass = new Grass(newX, newY);
            grassArr.push(newGrass);
            this.multiply = 0;
        }
    }
}

class Sheep {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.energy = 12;
        this.directions = [];
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(character) {
        this.getNewCoordinates();
        let found = [];
        for (const i in this.directions) {
            let x = this.directions[i][0];
            let y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[x][y] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found 
    }
    move() {
        let emptyCells = this.chooseCell(0);
        let emptyCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];

        if (emptyCell && this.energy > 0) {
            this.energy--;
            let newX = emptyCell[0];
            let newY = emptyCell[1];

            matrix[newX][newY] = 2;
            matrix[this.x][this.y] = 0;
            this.x = newX;
            this.y = newY;
        }
        else if (this.energy <= 0) {
            this.die();
        }
    }
    eat() {
        let grassCells = this.chooseCell(1);
        let flowerCells = this.chooseCell(4);
        let waterCells = this.chooseCell(5);

        let grassCell = grassCells[Math.floor(Math.random() * grassCells.length)];
        let flowerCell = flowerCells[Math.floor(Math.random() * flowerCells.length)];
        let waterCell = waterCells[Math.floor(Math.random() * waterCells.length)];

        if (grassCell && this.energy > 0) {
            this.energy++;
            let newX = grassCell[0];
            let newY = grassCell[1];

            matrix[newX][newY] = 2;
            matrix[this.x][this.y] = 0;

            for (let i = 0; i < grassArr.length; i++) {
                if (newX == grassArr[i].x && newY == grassArr[i].y) {
                    grassArr.splice(i, 1);
                }
            }
            this.x = newX;
            this.y = newY;
        }
        else if(flowerCell && this.energy > 0) {
            // this.energy++;
            let newX = flowerCell[0];
            let newY = flowerCell[1];

            matrix[newX][newY] = 4;
            matrix[this.x][this.y] = 0;

            for (let i = 0; i < flowerArr.length; i++) {
                if (newX == flowerArr[i].x && newY == flowerArr[i].y) {
                    flowerArr.splice(i, 1);
                }
            }
            this.x = newX;
            this.y = newY;

            this.die();
        }
        else if(waterCell && this.energy > 0) {
            this.energy++;
            let newX = waterCell[0];
            let newY = waterCell[1];

            matrix[newX][newY] = 5;
            matrix[this.x][this.y] = 0;

            for (let i = 0; i < waterArr.length; i++) {
                if (newX == waterArr[i].x && newY == waterArr[i].y) {
                    waterArr.splice(i, 1);
                }
            }
            this.x = newX;
            this.y = newY;
        }
        else {
            this.move();
        }
    }
    mul() {
        let emptyCell = this.chooseCell(0);
        let newCell = emptyCell[Math.floor(Math.random() * emptyCell.length)];

        if (newCell && this.energy >= 15) {
            let newX = newCell[0];
            let newY = newCell[1];
            matrix[newX][newY] = 2;
            let newSheep = new Sheep(newX, newY);
            sheepArr.push(newSheep);
            this.energy = 12;
        }
    }
    die() {
        matrix[this.x][this.y] = 0
        for (let i = 0; i < sheepArr.length; i++) {
            if (this.x == sheepArr[i].x && this.y == sheepArr[i].y) {
                sheepArr.splice(i, 1);
            }
        }
    }
}

class Wolf {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.energy = 20;
        this.directions = [];
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(character) {
        this.getNewCoordinates();
        let found = [];
        for (const i in this.directions) {
            let x = this.directions[i][0];
            let y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[x][y] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found
    }
    move() {
        let grassCells = this.chooseCell(0);
        let grassCell = grassCells[Math.floor(Math.random() * grassCells.length)];

        if (grassCell && this.energy > 0) {
            this.energy--;
            let newX = grassCell[0];
            let newY = grassCell[1];

            matrix[newX][newY] = 3;
            matrix[this.x][this.y] = 0;
            this.x = newX;
            this.y = newY;
        }
        else if (this.energy <= 0) {
            this.die();
        }
    }
    eat() {
        let sheepCells = this.chooseCell(2);
        let waterCells = this.chooseCell(5);
        let sheepCell = sheepCells[Math.floor(Math.random() * sheepCells.length)];
        let waterCell = waterCells[Math.floor(Math.random() * waterCells.length)];

        if (sheepCell && this.energy > 0) {
            this.energy += 3;
            let newX = sheepCell[0];
            let newY = sheepCell[1];

            matrix[newX][newY] = 3;
            matrix[this.x][this.y] = 0;

            for (let i = 0; i < sheepArr.length; i++) {
                if (newX == sheepArr[i].x && newY == sheepArr[i].y) {
                    sheepArr.splice(i, 1);
                }
            }
            this.x = newX;
            this.y = newY;

            this.mul();
        }
        else if (waterCell && this.energy > 0) {
            this.energy += 3;
            let newX = waterCell[0];
            let newY = waterCell[1];

            matrix[newX][newY] = 5;
            matrix[this.x][this.y] = 0;

            for (let i = 0; i < waterArr.length; i++) {
                if (newX == waterArr[i].x && newY == waterArr[i].y) {
                    waterArr.splice(i, 1);
                }
            }
            this.x = newX;
            this.y = newY;

            this.mul();
        }
        else {
            this.move();
        }
    }
    mul() {
        let emptyCell = this.chooseCell(0);
        let newCell = emptyCell[Math.floor(Math.random() * emptyCell.length)];

        if (newCell && this.energy >= 25) {
            let newX = newCell[0];
            let newY = newCell[1];
            matrix[newX][newY] = 3;
            let newWolf = new Wolf(newX, newY);
            wolfArr.push(newWolf);
            this.energy = 20;
        }
    }
    die() {
        matrix[this.x][this.y] = 0
        for (let i = 0; i < wolfArr.length; i++) {
            if (this.x == wolfArr[i].x && this.y == wolfArr[i].y) {
                wolfArr.splice(i, 1);
            }
        }
    }
}

class Flower {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x    , this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y    ],
            [this.x + 1, this.y    ],
            [this.x - 1, this.y + 1],
            [this.x    , this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(character) {
        let found = [];
        for (const i in this.directions) {
            let x = this.directions[i][0];
            let y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[x][y] == character) {
                found.push(this.directions[i]);
                }
            }
        }
        return found 
    }
    appear() {
        let grassCells = this.chooseCell(1);
        let grassCell = grassCells[Math.floor(Math.random() * grassCells.length)];
        for (let i = 0; i < this.directions.length; i++) {
            if (grassCell && this.directions[i] == grassCell){
            let newX = grassCell[0];
            let newY = grassCell[1];

            matrix[newX][newY] = 4;
            matrix[this.x][this.y] = 0;
            this.x = newX;
            this.y = newY;
            }
            else{
                this.die();
            }
        }
    }
    die() {
        matrix[this.x][this.y] = 0
        for (let i = 0; i < flowerArr.length; i++) {
            if(this.x == flowerArr[i].x && this.y == flowerArr[i].y){
                flowerArr.splice(i, 1);
            }
        }
    }
}

class Water {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.multiply = 0;
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    chooseCell(character) {
        let found = [];
        for (const i in this.directions) {
            let x = this.directions[i][0];
            let y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[x][y] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found
    }

    mul() {
        this.multiply++;
        let emptyCell = this.chooseCell(0); 
        let newCell = emptyCell[Math.floor(Math.random() * emptyCell.length)]; 
        if (newCell && this.multiply >= 3) {
            let newX = newCell[0]; 
            let newY = newCell[1]; 
            matrix[newX][newY] = 5; 
            let newWater = new Water(newX, newY);
            waterArr.push(newWater);
            this.multiply = 0;
        }
    }
}
