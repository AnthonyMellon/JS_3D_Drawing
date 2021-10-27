var width;
var height;
var ctx;
var size = 100;

var points = [[0, 0],
              [1, 1],
              [2, 2],
              [3, 3],
              [4, 4],
              [5, 5],
              [6, 6],
              [7, 7]];

var rot = { //Rotation values in degrees
    X: 0,
    Y: 0,
    Z: 0,
};

function setupCanvas() {
    const canvas = document.querySelector('.myCanvas');

    width = window.innerWidth;
    canvas.width = width;
    
    height = window.innerHeight;
    canvas.height = height;

    return canvas.getContext('2d');
}

function clearScreen(fillStyle)
{
    ctx.fillStyle = fillStyle;
    ctx.fillRect(0, 0, width, height);
}


function setPoints()
{
    points[0] = [0, 0];
    points[1] = [1, 0];
    points[2] = [1, 1];
    points[3] = [0, 1]

    let dX = Math.cos(degToRad(rot.X));
    let dy = Math.sin(degToRad(rot.Y));
    for(let i = 0; i < 4; i++)
    {
        points[i][0] = points[i][0] + dX/2;
        points[i][1] = points[i][1] + dy/2;
        points[i+4][0] = points[i][0] + dX/2;
        points[i+4][1] = points[i][1] + dy/2;
    }

    points.forEach(point => {
        point[0] *= size;
        point[1] *= size;
    });
}

function draw()
{   
    ctx.fillStyle = 'white';

    let offsetX = 250;
    let offsetY = 250;

    ctx.lineWidth = 5;
    ctx.strokeStyle = 'white';

    //Draw back square       
    ctx.beginPath();
    ctx.moveTo(points[4][0] + offsetX, points[4][1] + offsetY);
    for(var i = 1; i < 5; i++)
    {
        ctx.lineTo(points[(i%4)+4][0] + offsetX, points[(i%4)+4][1] + offsetY);
    }
    ctx.strokeStyle = 'red';
    ctx.stroke();
    ctx.fillStyle = 'brown';
    ctx.fill();

    //Connect the squares  
    ctx.strokeStyle = 'white';        
    for(var i = 0; i < 4; i++)
    {
        ctx.beginPath();
        ctx.moveTo(points[i][0] + offsetX, points[i][1] + offsetY);
        ctx.lineTo(points[i+4][0] + offsetX, points[i+4][1] + offsetY);
        ctx.stroke();
    }

    //Draw front square
    ctx.beginPath();   
    ctx.moveTo(points[0][0] + offsetX, points[0][1] + offsetY);
    for(var i = 1; i < 5; i++)
    {
        ctx.lineTo(points[i%4][0] + offsetX, points[i%4][1] + offsetY);
    }
    ctx.strokeStyle = 'white';
    ctx.stroke();
    ctx.fillStyle = 'rgba(150, 150, 150, 0.75)';
    ctx.fill();
}

function mainAnimationLoop()
{
    clearScreen('black');
    rot.X += 1;
    rot.X = normaliseAngle(rot.X);

    rot.Y += 1;
    rot.Y = normaliseAngle(rot.Y);

    rot.Z += 1;
    rot.Z = normaliseAngle(rot.Z);

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