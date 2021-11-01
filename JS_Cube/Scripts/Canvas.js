var width;
var height;
var ctx;

var rot = { //Rotation values in degrees
    X: 0,
    Y: 0,
    Z: 0,
};

var cube = {
    size: 100,

    position: {
        X: 500,
        Y: 500,
        Z: 0
    },

    points: points = [[0, 0, 0],
                      [1, 1, 1],
                      [2, 2, 2],
                      [3, 3, 3],
                      [4, 4, 4],
                      [5, 5, 5],
                      [6, 6, 6],
                      [7, 7, 7]],

    faces: {
        faceFront: {
            vertices: [[0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]],
            avgX: 0,
            avgY: 0,
            avgZ: 0
        },
        faceBack: {
            vertices: [[0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]],
            avgX: 0,
            avgY: 0,
            avgZ: 0
        },
        faceLeft: {
            vertices: [[0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]],
            avgX: 0,
            avgY: 0,
            avgZ: 0
        },
        faceRight: {
            vertices: [[0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]],
            avgX: 0,
            avgY: 0,
            avgZ: 0
        },
        faceTop: {
            vertices: [[0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]],
            avgX: 0,
            avgY: 0,
            avgZ: 0
        },
        faceBottom: {
            vertices: [[0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]],
            avgX: 0,
            avgY: 0,
            avgZ: 0
        },
    },

}



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


function rotatePoints() { //Rotate the cubes vertices around the X Y and Z axis 

    //Set front points to how they would be in a normal square PUT THIS IN A LOOP >:( )    
    cube.points[0] = [cube.position.X - cube.size/2, cube.position.Y - cube.size/2, cube.position.Z + cube.size/2];
    cube.points[1] = [cube.position.X + cube.size/2, cube.position.Y - cube.size/2, cube.position.Z + cube.size/2];
    cube.points[2] = [cube.position.X + cube.size/2, cube.position.Y + cube.size/2, cube.position.Z + cube.size/2];
    cube.points[3] = [cube.position.X - cube.size/2, cube.position.Y + cube.size/2, cube.position.Z + cube.size/2];
    cube.points[4] = [cube.position.X - cube.size/2, cube.position.Y - cube.size/2, cube.position.Z - cube.size/2];
    cube.points[5] = [cube.position.X + cube.size/2, cube.position.Y - cube.size/2, cube.position.Z - cube.size/2];
    cube.points[6] = [cube.position.X + cube.size/2, cube.position.Y + cube.size/2, cube.position.Z - cube.size/2];
    cube.points[7] = [cube.position.X - cube.size/2, cube.position.Y + cube.size/2, cube.position.Z - cube.size/2];

    //X axis rotation
    for(let i = 0; i < 8; i++) {    
             
        cube.points[i][1] -= cube.position.Y;
        cube.points[i][2] -= cube.position.Z;
        let newPoint = rotatePoint([cube.points[i][1], cube.points[i][2]], degToRad(rot.X));
        cube.points[i][1] = newPoint[0]; 
        cube.points[i][2] = newPoint[1]; 
        cube.points[i][1] += cube.position.Y;
        cube.points[i][2] += cube.position.Z;
    }

    //Y axis rotation
    for(let i = 0; i < 8; i++) {  
             
        cube.points[i][0] -= cube.position.X;
        cube.points[i][2] -= cube.position.Z;
        let newPoint = rotatePoint([cube.points[i][0], cube.points[i][2]], degToRad(rot.Y));
        cube.points[i][0] = newPoint[0]; 
        cube.points[i][2] = newPoint[1]; 
        cube.points[i][0] += cube.position.X;
        cube.points[i][2] += cube.position.Z;
    }

    //Z axis rotation
    for(let i = 0; i < 8; i++) {
             
        cube.points[i][0] -= cube.position.X;
        cube.points[i][1] -= cube.position.Y;
        let newPoint = rotatePoint([cube.points[i][0], cube.points[i][1]], degToRad(rot.Z));
        cube.points[i][0] = newPoint[0];
        cube.points[i][1] = newPoint[1];
        cube.points[i][0] += cube.position.X;
        cube.points[i][1] += cube.position.Y;
    }
}

function defineFaces() { //Define the six faces of the cube
  
    cube.faces.faceFront.vertices = [[cube.points[0]], [cube.points[1]], [cube.points[2]], [cube.points[3]]];
    cube.faces.faceBack.vertices =  [[cube.points[4]], [cube.points[5]], [cube.points[6]], [cube.points[7]]];
    cube.faces.faceLeft.vertices =  [[cube.points[0]], [cube.points[4]], [cube.points[7]], [cube.points[3]]];
    cube.faces.faceRight.vertices = [[cube.points[1]], [cube.points[5]], [cube.points[6]], [cube.points[2]]];
    cube.faces.faceTop.vertices =   [[cube.points[0]], [cube.points[1]], [cube.points[5]], [cube.points[4]]];
    cube.faces.faceBottom.vertices =[[cube.points[3]], [cube.points[2]], [cube.points[6]], [cube.points[7]]];

    let centerPoint = 0;
    //Front face
    centerPoint = findCenterPoint(cube.faces.faceFront);
    cube.faces.faceFront.avgX = centerPoint.X;    
    cube.faces.faceFront.avgY = centerPoint.Y;    
    cube.faces.faceFront.avgZ = centerPoint.Z;    

    //Back Face
    centerPoint = findCenterPoint(cube.faces.faceBack);
    cube.faces.faceBack.avgX = centerPoint.X;    
    cube.faces.faceBack.avgY = centerPoint.Y;    
    cube.faces.faceBack.avgZ = centerPoint.Z; 

    //Left Face
    centerPoint = findCenterPoint(cube.faces.faceLeft);
    cube.faces.faceLeft.avgX = centerPoint.X;    
    cube.faces.faceLeft.avgY = centerPoint.Y;    
    cube.faces.faceLeft.avgZ = centerPoint.Z; 

    //Right Face
    centerPoint = findCenterPoint(cube.faces.faceRight);
    cube.faces.faceRight.avgX = centerPoint.X;    
    cube.faces.faceRight.avgY = centerPoint.X;    
    cube.faces.faceRight.avgZ = centerPoint.Z; 

    //Top Face
    centerPoint = findCenterPoint(cube.faces.faceTop);
    cube.faces.faceTop.avgX = centerPoint.X;    
    cube.faces.faceTop.avgY = centerPoint.Y;    
    cube.faces.faceTop.avgZ = centerPoint.Z; 

    //Bottom Face
    centerPoint = findCenterPoint(cube.faces.faceBottom);
    cube.faces.faceBottom.avgX = centerPoint.X;    
    cube.faces.faceBottom.avgY = centerPoint.Y;    
    cube.faces.faceBottom.avgZ = centerPoint.Z; 
}

function findCenterPoint(face) {

    let centerPoint = {
        X: 0,
        Y: 0,
        Z: 0
    };

    centerPoint.X = (face.vertices[0][0][0] + face.vertices[1][0][0] + face.vertices[2][0][0] + face.vertices[3][0][0])/4;
    centerPoint.Y = (face.vertices[0][0][1] + face.vertices[1][0][1] + face.vertices[2][0][1] + face.vertices[3][0][1])/4;
    centerPoint.Z = (face.vertices[0][0][2] + face.vertices[1][0][2] + face.vertices[2][0][2] + face.vertices[3][0][2])/4;
    
    return centerPoint;
}

function draw() { //Draws the cube to the screen
   
    let wireframe = false;

    let offsetX = 0;
    let offsetY = 0;

    ctx.lineWidth = 1;
    ctx.strokeStyle = 'white';

    //Draw back square       
    ctx.beginPath();
    ctx.moveTo(cube.points[4][0] + offsetX, cube.points[4][1] + offsetY);
    for(var i = 1; i < 5; i++) {
    
        ctx.lineTo(cube.points[(i%4)+4][0] + offsetX, cube.points[(i%4)+4][1] + offsetY);
    }
    ctx.stroke();
    if(!wireframe) {
    
        ctx.fillStyle = 'brown';
        ctx.fill();
    }

    //Connect the squares  
    ctx.strokeStyle = 'white';        
    for(var i = 0; i < 4; i++) {
    
        //ctx.strokeStyle = `rgb(${255 - i*25}, ${i*50}, ${i*25})`
        ctx.beginPath();        
        ctx.moveTo(cube.points[i][0] + offsetX, cube.points[i][1] + offsetY);
        ctx.lineTo(cube.points[i+4][0] + offsetX, cube.points[i+4][1] + offsetY);
        ctx.stroke();
    }

    //Draw front square
    ctx.beginPath();   
    ctx.moveTo(cube.points[0][0] + offsetX, cube.points[0][1] + offsetY);
    for(var i = 1; i < 5; i++) {
    
        ctx.lineTo(cube.points[i%4][0] + offsetX, cube.points[i%4][1] + offsetY);
    }
    ctx.strokeStyle = 'white';
    ctx.stroke();
    if(!wireframe) {
    
        ctx.fillStyle = 'rgba(150, 150, 150, 1)';
        ctx.fill();
    }

}

function mainAnimationLoop() { //Main animation loop, runs once each frame
    
    //Setup
    validateCanvasSize();    
    clearScreen('black');

    //Rotation
    rot.X += 1;
    rot.X = normaliseAngle(rot.X);

    rot.Y += 0;
    rot.Y = normaliseAngle(rot.Y);

    rot.Z += 0;
    rot.Z = normaliseAngle(rot.Z);

    //Draw
    defineFaces();
    rotatePoints();
    draw();

    requestAnimationFrame(mainAnimationLoop);    
}

function main() { //Main function for intial setup, only runs once

    console.log("drawing cube...");  
    ctx = setupCanvas();
    clearScreen('black');
    mainAnimationLoop();
    
}
main();