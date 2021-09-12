let grassArr = [];
let sheepArr = []; 
let wolfArr = []; 
let flowerArr = []; 
let waterArr = []; 

let matrix = [];

function generator(n,grass,sheep,wolf,water) {
    for (let x = 0; x < n; x++) {
        matrix[x] = [];
        for (let y = 0; y < n; y++) {
            matrix[x][y] = 0;
            
        }
    }
    for (let i = 0; i < grass; i++) {
        let x = Math.floor(Math.random() * n);
        let y = Math.floor(Math.random() * n);
        if(matrix[x][y] == 0) {
            matrix[x][y] = 1;
        }
    }
    for (let i = 0; i < sheep; i++) {
        let x = Math.floor(Math.random() * n);
        let y = Math.floor(Math.random() * n);
        if(matrix[x][y] == 0) {
            matrix[x][y] = 2;
        }
    }
    for (let i = 0; i < wolf; i++) {
        let x = Math.floor(Math.random() * n);
        let y = Math.floor(Math.random() * n);
        if(matrix[x][y] == 0) {
            matrix[x][y] = 3;
        }
    }
    for (let i = 0; i < water; i++) {
        let x = Math.floor(Math.random() * n);
        let y = Math.floor(Math.random() * n);
        if(matrix[x][y] == 0) {
            matrix[x][y] = 5;
        }
    }
    // for (let i = 0; i < flower; i++) {
    //     let x = Math.floor(Math.random() * n);
    //     let y = Math.floor(Math.random() * n);
    //     if(matrix[x][y] == 0) {
    //         matrix[x][y] = 4;
    //     }
    // }
}

generator(100,1000,1000,100,1500);



let side = 5;
// let img;

function setup() {
    createCanvas(matrix[0].length * side, matrix.length * side);
    background("black");
    frameRate(50);
    for (let x = 0; x < matrix.length; x++) {
        for (let y = 0; y < matrix[x].length; y++) {
            if (matrix[x][y] == 1) {
                let gr = new Grass(x, y);
                grassArr.push(gr);
                // img = loadImage("");
            }
            else if (matrix[x][y] == 2) {
                let sheep = new Sheep(x, y);
                sheepArr.push(sheep);
                // img = loadImage("");
            }
            else if (matrix[x][y] == 3) {
                let wolf = new Wolf(x, y);
                wolfArr.push(wolf);
                // img = loadImage("");
            }
            else if (matrix[x][y] == 4) {
                let flower = new Flower(x, y);
                flowerArr.push(flower);
                // img = loadImage("");
            }
            else if (matrix[x][y] == 5) {
                let water = new Water(x, y);
                waterArr.push(water);
                // img = loadImage("");
            }
        }
    }
}

function draw() {
    for (let x = 0; x < matrix.length; x++) {
        for (let y = 0; y < matrix[x].length; y++) {
            if (matrix[x][y] == 0) {
                fill("grey");
                // image(img, 0,0);
            } 
            else if (matrix[x][y] == 1) {
                fill("green");
                // image(img, 0,0);
            }
            else if (matrix[x][y] == 2) {
                fill("white");
                // image(img, 0,0);
            }
            else if (matrix[x][y] == 3) {
                fill("black");
                // image(img, 0,0);
            }
            else if (matrix[x][y] == 4) {
                fill("red");
                // image(img, 0,0);
            }
            else if (matrix[x][y] == 5) {
                fill("blue");
                // image(img, 0,0);
            }
            rect(y * side, x * side, side, side);
        }
    }
    for (const i in grassArr) {
        grassArr[i].mul();
    }
    for (const i in sheepArr) {
        sheepArr[i].mul();
        sheepArr[i].eat();
    }
    for (const i in wolfArr) {
        wolfArr[i].mul();
        wolfArr[i].eat();
    }
    for (const i in flowerArr) {
        flowerArr[i].appear();
        grassArr[i].grassCells();
    }

    for (let i = 0; i < grassArr.length; i++) { 
    let found = grassArr[i].chooseCell(1);
        if (found.length == 8) {
            let x = grassArr[i].x
            let y = grassArr[i].y
            matrix[x][y] = 4;
            let flower = new Flower(x, y)
        }
    }

    for (const i in waterArr) {
        waterArr[i].mul();
    }
}