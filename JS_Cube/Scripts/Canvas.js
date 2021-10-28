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
        X: 500,
        Y: 500
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
    square.points[0] = [square.position.X - square.size/2, square.position.Y - square.size/2];
    square.points[1] = [square.position.X + square.size/2, square.position.Y - square.size/2];
    square.points[2] = [square.position.X + square.size/2, square.position.Y + square.size/2];
    square.points[3] = [square.position.X - square.size/2, square.position.Y + square.size/2];
    square.points[4] = [square.position.X - square.size/2, square.position.Y - square.size/2];
    square.points[5] = [square.position.X + square.size/2, square.position.Y - square.size/2];
    square.points[6] = [square.position.X + square.size/2, square.position.Y + square.size/2];
    square.points[7] = [square.position.X - square.size/2, square.position.Y + square.size/2];

    //Z axis rotation
    for(let i = 0; i < 8; i++)
    {         
        square.points[i][0] -= square.position.X;
        square.points[i][1] -= square.position.Y;
        square.points[i] = rotatePoint(square.points[i], degToRad(rot.Z));
        square.points[i][0] += square.position.X;
        square.points[i][1] += square.position.Y;
    }

    //X axis rotation

    //Y axis rotation
    for(let i = 0; i < 4; i++)
    {
        let newFront = 0;
        let newBack = 0;

        let myFrontPoint = 0;
        let myBackPoint = 0;

        myFrontPoint = square.points[i][0] - square.position.X;
        myBackPoint = square.points[i+4][0] - square.position.X;

        newFront = (myFrontPoint) * Math.sin(degToRad(rot.Y));
        newBack = (myBackPoint) * Math.cos(degToRad(rot.Y));

        square.points[i][0] = newFront + square.position.X;
        square.points[i+4][0] = newBack + square.position.X;
    }

    
}

function draw()
{   
    let wireframe = false;

    let offsetX = 0;
    let offsetY = 0;

    ctx.lineWidth = 1;
    ctx.strokeStyle = 'white';

    //Draw back square       
    ctx.beginPath();
    ctx.moveTo(square.points[4][0] + offsetX, square.points[4][1] + offsetY);
    for(var i = 1; i < 5; i++)
    {
        ctx.lineTo(square.points[(i%4)+4][0] + offsetX, square.points[(i%4)+4][1] + offsetY);
    }
    ctx.stroke();
    if(!wireframe)
    {
        ctx.fillStyle = 'brown';
        ctx.fill();
    }

    //Connect the squares  
    ctx.strokeStyle = 'white';        
    for(var i = 0; i < 4; i++)
    {
        //ctx.strokeStyle = `rgb(${255 - i*25}, ${i*50}, ${i*25})`
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
    if(!wireframe)
    {
        ctx.fillStyle = 'rgba(150, 150, 150, 0.5)';
        ctx.fill();
    }

}

function mainAnimationLoop()
{    
    //Setup
    validateCanvasSize();
    clearScreen('black');

    //Rotation
    rot.X += 0;
    rot.X = normaliseAngle(rot.X);

    rot.Y += 1;
    rot.Y = normaliseAngle(rot.Y);

    rot.Z += 0;
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