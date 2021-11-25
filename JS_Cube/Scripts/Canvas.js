//This is the lowest level of the application

var width;
var height;
var ctx;

var WORLD_MANAGER;

function setupCanvas() { //Set the canvas up

    const canvas = document.querySelector('.myCanvas');

    width = window.innerWidth;
    canvas.width = width;
    
    height = window.innerHeight;
    canvas.height = height;

    return canvas.getContext('2d');
}

function validateCanvasSize() { //Ensure the canvas is the same size as the window

    let canvasNeedsUpdate = false;

    if(width != window.innerWidth) {
        width = window.innerWidth;
        canvasNeedsUpdate = true;
    }
    if(height != window.innerHeight) {        
        height = window.innerHeight;
        canvasNeedsUpdate = true;
    }

    if(canvasNeedsUpdate)
    {
        setupCanvas();
    }
}

function clearScreen(fillStyle) { //Reset the screen to plain black

    ctx.fillStyle = fillStyle;
    ctx.fillRect(0, 0, width, height);
}

function mainAnimationLoop() { //Main animation loop, runs once each frame
    
    //Canvas Setup
    validateCanvasSize();    
    clearScreen('black');

    //Recenter the cube
    //myCube.setPosition([width/2, height/2, myCube.getPosition()[2]]);
    
    WORLD_MANAGER.rotateCubes();
    WORLD_MANAGER.drawCubes('solidOutlined', 1);    
    requestAnimationFrame(mainAnimationLoop);    
}

function main() { //Main function for intial setup, only runs once
 
    ctx = setupCanvas();
    clearScreen('black'); 

    WORLD_MANAGER = new WorldManager(ctx, width, height);
    WORLD_MANAGER.generateCubesList();

    mainAnimationLoop(); 
}
main();