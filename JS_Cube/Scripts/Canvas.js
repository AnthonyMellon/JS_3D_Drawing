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
        X: 0,
        Y: 0,
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
            avgZ: 0,
            colour: 'white'
        },
        faceBack: {
            vertices: [[0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]],
            avgX: 0,
            avgY: 0,
            avgZ: 0,
            colour: 'white'
        },
        faceLeft: {
            vertices: [[0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]],
            avgX: 0,
            avgY: 0,
            avgZ: 0,
            colour: 'white'
        },
        faceRight: {
            vertices: [[0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]],
            avgX: 0,
            avgY: 0,
            avgZ: 0,
            colour: 'white'
        },
        faceTop: {
            vertices: [[0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]],
            avgX: 0,
            avgY: 0,
            avgZ: 0,
            colour: 'white'
        },
        faceBottom: {
            vertices: [[0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]],
            avgX: 0,
            avgY: 0,
            avgZ: 0,
            colour: 'white'
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
    cube.faces.faceFront.colour = 'rgba(255, 0, 0, 0.75)';  

    //Back Face
    centerPoint = findCenterPoint(cube.faces.faceBack);
    cube.faces.faceBack.avgX = centerPoint.X;    
    cube.faces.faceBack.avgY = centerPoint.Y;    
    cube.faces.faceBack.avgZ = centerPoint.Z; 
    cube.faces.faceBack.colour = 'rgba(0, 255, 0, 0.75)'; 

    //Left Face
    centerPoint = findCenterPoint(cube.faces.faceLeft);
    cube.faces.faceLeft.avgX = centerPoint.X;    
    cube.faces.faceLeft.avgY = centerPoint.Y;    
    cube.faces.faceLeft.avgZ = centerPoint.Z; 
    cube.faces.faceLeft.colour = 'rgba(255, 0, 255, 0.75)'; 

    //Right Face
    centerPoint = findCenterPoint(cube.faces.faceRight);
    cube.faces.faceRight.avgX = centerPoint.X;    
    cube.faces.faceRight.avgY = centerPoint.X;    
    cube.faces.faceRight.avgZ = centerPoint.Z; 
    cube.faces.faceRight.colour = 'rgba(0, 255, 255, 0.75)'; 

    //Top Face
    centerPoint = findCenterPoint(cube.faces.faceTop);
    cube.faces.faceTop.avgX = centerPoint.X;    
    cube.faces.faceTop.avgY = centerPoint.Y;    
    cube.faces.faceTop.avgZ = centerPoint.Z; 
    cube.faces.faceTop.colour = 'rgba(0, 0, 255, 0.75)'; 

    //Bottom Face
    centerPoint = findCenterPoint(cube.faces.faceBottom);
    cube.faces.faceBottom.avgX = centerPoint.X;    
    cube.faces.faceBottom.avgY = centerPoint.Y;    
    cube.faces.faceBottom.avgZ = centerPoint.Z; 
    cube.faces.faceBottom.colour = 'rgba(255, 255, 0, 0.75)'; 
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

function DrawCube(drawMode) {

    ctx.lineWidth = 1;

    let facesToDraw = [
                        cube.faces.faceFront, 
                        cube.faces.faceBack, 
                        cube.faces.faceLeft, 
                        cube.faces.faceRight, 
                        cube.faces.faceTop, 
                        cube.faces.faceBottom
                        ];

    for(let i = 0; i < facesToDraw.length - 1; i++) {

        for(let j = 0; j < facesToDraw.length - i - 1; j++) {

            if(facesToDraw[j].avgZ > facesToDraw[j + 1].avgZ) {

                let temp = facesToDraw[j];
                facesToDraw[j] = facesToDraw[j + 1]
                facesToDraw[j + 1] = temp;
            }
        }
    }

    for(let i = 0; i < facesToDraw.length; i++) { //Draw each face

        ctx.beginPath();

        let startX = facesToDraw[i].vertices[0][0][0];
        let startY = facesToDraw[i].vertices[0][0][1];  
  
        ctx.moveTo(startX, startY);

        for(let j = 1; j < facesToDraw[i].vertices.length; j++) { //Trace to each vertex in the current face

            let x = facesToDraw[i].vertices[j][0][0];
            let y = facesToDraw[i].vertices[j][0][1];
            ctx.lineTo(x, y);  
                        
        }  
        ctx.lineTo(startX, startY);
        
        //Draw according to darwMode
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

function centerCube()
{
    cube.position.X = width/2;
    cube.position.Y = height/2;
}

function mainAnimationLoop() { //Main animation loop, runs once each frame
    
    //Setup
    validateCanvasSize();    
    clearScreen('black');

    //Rotation
    rot.X += 1;
    rot.X = normaliseAngle(rot.X);

    rot.Y += 1;
    rot.Y = normaliseAngle(rot.Y);

    rot.Z += 0;
    rot.Z = normaliseAngle(rot.Z);

    //Draw
    centerCube();    
    rotatePoints();
    defineFaces();
    DrawCube('solidOutlined');

    requestAnimationFrame(mainAnimationLoop);    
}

function main() { //Main function for intial setup, only runs once

    console.log("drawing cube...");  
    ctx = setupCanvas();
    clearScreen('black');
    mainAnimationLoop();
    
}
main();