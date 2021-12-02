
function mainAnimationLoop() { //The main animation loop, runs once each frame

    myGameManager.runGameFrame();
    myRenderer.drawCubes(myGameManager.returnCubes(), 'solidOutlined', 1);

    requestAnimationFrame(mainAnimationLoop);
}

function main() { //Main function for initial setup, runs only once

    ctx = setupCanvas();  
    
    myGameManager = new GameManager();
    myRenderer = new renderer();

    myRenderer.clearScreen('black');

    mainAnimationLoop();
}
main();