var width;
var height;
var ctx;

var rot = { //Rotation values in degrees
    X: 90,
    Y: 0,
    Z: 0,
};

var square = {
    size: 100,
    position: {
        x: 500,
        y: 500
    },
    points: points = [[0, 0],
                      [1, 1],
                      [2, 2],
                      [3, 3],
                      [4, 4],
                      [5, 5],
                      [6, 6],
                      [7, 7]],

}

function setupCanvas() {
    const canvas = document.querySelector('.myCanvas');

    width = window.innerWidth;
    canvas.width = width;
    
    height = window.innerHeight;
    canvas.height = height;

    return canvas.getContext('2d');
}

function validateCanvasSize()
{
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

function clearScreen(fillStyle)
{
    ctx.fillStyle = fillStyle;
    ctx.fillRect(0, 0, width, height);
}


function setPoints()
{
    //Set front points to how they would be in a normal square PUT THIS IN A LOOP >:( )    
    square.points[0] = [square.position.x - square.size/2, square.position.y - square.size/2];
    square.points[1] = [square.position.x + square.size/2, square.position.y - square.size/2];
    square.points[2] = [square.position.x + square.size/2, square.position.y + square.size/2];
    square.points[3] = [square.position.x - square.size/2, square.position.y + square.size/2];
    square.points[4] = [square.position.x - square.size/2, square.position.y - square.size/2];
    square.points[5] = [square.position.x + square.size/2, square.position.y - square.size/2];
    square.points[6] = [square.position.x + square.size/2, square.position.y + square.size/2];
    square.points[7] = [square.position.x - square.size/2, square.position.y + square.size/2];

    //Z axis rotation
    for(let i = 0; i < 8; i++)
    {         
        square.points[i][0] -= square.position.x;
        square.points[i][1] -= square.position.y;
        square.points[i] = rotatePoint(square.points[i], degToRad(rot.Z));
        square.points[i][0] += square.position.x;
        square.points[i][1] += square.position.y;
    }

    //X axis rotation
    //let dX = Math.cos(degToRad(rot.X));
    // for(let i = 0; i < 8; i++)
    // {
    //     let newX = (Math.cos(degToRad(rot.X))*(square.points[i][0]-square.size)) - (Math.sin(degToRad(rot.X))*(square.points[i][1]-square.size));
    //     let newY = (Math.sin(degToRad(rot.X))*(square.points[i][0]-square.size)) + (Math.cos(degToRad(rot.X))*(square.points[i][1]-square.size));
       
    //     square.points[i][0] = newX;
    //     square.points[i][1] = newY;
    // }

    //Y axis rotation
    //let dy = Math.sin(degToRad(rot.Y)); 
    // for(let i = 0; i < 8; i++)
    // {
    //     let newX = (Math.cos(degToRad(rot.Y))*(square.points[i][0]-square.size)) - (Math.sin(degToRad(rot.Y))*(square.points[i][1]-square.size));
    //     let newY = (Math.sin(degToRad(rot.Y))*(square.points[i][0]-square.size)) + (Math.cos(degToRad(rot.Y))*(square.points[i][1]-square.size));
       
    //     square.points[i][0] = newX;
    //     square.points[i][1] = newY;
    // }
    
    //Update points
    // for(let i = 0; i < 4; i++)
    // {
    //     square.points[i][0] = square.points[i][0] + dX/2;
    //     square.points[i][1] = square.points[i][1] + dy/2;
    //     square.points[i+4][0] = square.points[i+4][0] + dX/2;
    //     square.points[i+4][1] = square.points[i+4][1] + dy/2;
    // }
}

function draw()
{   
    ctx.fillStyle = 'white';

    let offsetX = 0;
    let offsetY = 0;

    ctx.lineWidth = 5;
    ctx.strokeStyle = 'white';

    //Draw back square       
    ctx.beginPath();
    ctx.moveTo(square.points[4][0] + offsetX, square.points[4][1] + offsetY);
    for(var i = 1; i < 5; i++)
    {
        ctx.lineTo(square.points[(i%4)+4][0] + offsetX, square.points[(i%4)+4][1] + offsetY);
    }
    ctx.strokeStyle = 'red';
    ctx.stroke();
    ctx.fillStyle = 'brown';
    ctx.fill();

    //Connect the squares  
    ctx.strokeStyle = 'white';        
    for(var i = 0; i < 4; i++)
    {
        ctx.strokeStyle = `rgb(${255 - i*25}, ${i*50}, ${i*25})`
        ctx.beginPath();        
        ctx.moveTo(square.points[i][0] + offsetX, square.points[i][1] + offsetY);
        ctx.lineTo(square.points[i+4][0] + offsetX, square.points[i+4][1] + offsetY);
        ctx.stroke();
    }

    //Draw front square
    ctx.beginPath();   
    ctx.moveTo(square.points[0][0] + offsetX, square.points[0][1] + offsetY);
    for(var i = 1; i < 5; i++)
    {
        ctx.lineTo(square.points[i%4][0] + offsetX, square.points[i%4][1] + offsetY);
    }
    ctx.strokeStyle = 'white';
    ctx.stroke();
    ctx.fillStyle = 'rgba(150, 150, 150, 0.75)';
    ctx.fill();
}

function mainAnimationLoop()
{    
    //Setup
    validateCanvasSize();
    clearScreen('black');

    //Rotation
    rot.X += 0;
    rot.X = normaliseAngle(rot.X);

    rot.Y += 0;
    rot.Y = normaliseAngle(rot.Y);

    rot.Z += 1;
    rot.Z = normaliseAngle(rot.Z);

    //Draw
    setPoints();
    draw();

    requestAnimationFrame(mainAnimationLoop);    
}

function main()
{
    console.log("drawing cube...");  
    ctx = setupCanvas();
    clearScreen('black');
    mainAnimationLoop();
    
}
main();