var width;
var height;
var ctx;

const myCube = new newCube(100, [250, 250, 250]);

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

function drawCube(cube, drawMode, lineWidth) {
    ctx.lineWidth = lineWidth;

    //Get the faces that need drawn
    let facesToDraw = cube.getFaces();

    //Bubble sort the faces on their Z position
    for(let i = 0; i < facesToDraw.length - 1; i++) {
        for(let j = 0; j < facesToDraw.length - i - 1; j++) {
            if(facesToDraw[j].centerPoint[2] > facesToDraw[j + 1].centerPoint[2]) {
                let temp = facesToDraw[j];
                facesToDraw[j] = facesToDraw[j + 1];
                facesToDraw[j + 1] = temp;
            }
        }
    }

    //Draw each face
    for(let i = 0; i < facesToDraw.length; i++) {
        ctx.beginPath();

        let startX = facesToDraw[i].vertices[0][0];
        let startY = facesToDraw[i].vertices[0][1];

        ctx.moveTo(startX, startY);

        //Trace to each vertix in the current face
        for(let j = 1; j < facesToDraw[i].vertices.length; j++) {
            let X = facesToDraw[i].vertices[j][0];
            let Y = facesToDraw[i].vertices[j][1];
            ctx.lineTo(X, Y); 
        }

        ctx.lineTo(startX, startY);

        //Draw according to drawMode
        if(drawMode === 'solid') {
            ctx.fillStyle = facesToDraw[i].colour;
            ctx.fill();
        }
        else if(drawMode === 'solidOutlined') {
            ctx.fillStyle = facesToDraw[i].colour;
            ctx.fill();
            ctx.strokeStyle = 'white';
            ctx.stroke();

        }
        else { //Default to a wireframe view
            ctx.strokeStyle = facesToDraw[i].colour;
            ctx.stroke();
        }
    }
}

function mainAnimationLoop() { //Main animation loop, runs once each frame
    
    //Canvas Setup
    validateCanvasSize();    
    clearScreen('black');

    //Recenter the cube
    myCube.setPosition([width/2, height/2, myCube.getPosition()[2]]);

    //Set the cube vertices then rotate them
    myCube.setupVertices();
    myCube.Rotate(0, 1);
    myCube.Rotate(1, 0);
    myCube.Rotate(1, 1);

    //Set the faces
    myCube.setupFaces();

    //Draw the cube
    drawCube(myCube, 'solidOutlined', 1);

    requestAnimationFrame(mainAnimationLoop);    
}

function main() { //Main function for intial setup, only runs once
 
    ctx = setupCanvas();
    clearScreen('black');     
    mainAnimationLoop(); 
}
main();