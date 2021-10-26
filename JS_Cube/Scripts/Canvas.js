var width;
var height;
var points = [[0, 0],
              [1, 1],
              [2, 2],
              [3, 3],
              [4, 4],
              [5, 5],
              [6, 6],
              [7, 7]];
var size = 100;
var ctx;
var angleX = 0;
var angleY = 0;

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

    let dX = Math.cos(degToRad(angleX));
    let dy = Math.cos(degToRad(angleY));
    for(let i = 0; i < 4; i++)
    {
        points[i+4][0] = points[i][0] + dX;
        points[i+4][1] = points[i][1] + dy;
    }

    points.forEach(point => {
        point[0] *= size;
        point[1] *= size;
    });
}

function draw()
{
    let offsetX = 250;
    let offsetY = 250;

    ctx.lineWidth = 5;
    ctx.strokeStyle = 'white';

    //Draw back square
    //ctx.strokeStyle = 'red';       
    ctx.beginPath();
    ctx.moveTo(points[4][0] + offsetX, points[4][1] + offsetY);
    for(var i = 1; i < 5; i++)
    {
        ctx.lineTo(points[(i%4)+4][0] + offsetX, points[(i%4)+4][1] + offsetY);
    }
    ctx.stroke();

    //Draw front square
    ctx.strokeStyle = 'white';
    ctx.beginPath();   
    ctx.moveTo(points[0][0] + offsetX, points[0][1] + offsetY);
    for(var i = 1; i < 5; i++)
    {
        ctx.lineTo(points[i%4][0] + offsetX, points[i%4][1] + offsetY);
    }
    ctx.stroke();

    //Connect the squares  
    ctx.strokeStyle = 'white';        
    for(var i = 0; i < 4; i++)
    {
        ctx.beginPath();
        ctx.moveTo(points[i][0] + offsetX, points[i][1] + offsetY);
        ctx.lineTo(points[i+4][0] + offsetX, points[i+4][1] + offsetY);
        ctx.stroke();
    }

}

function frame()
{
    clearScreen();
    angleX += 1;
    angleX = angleX % 360;

    angleY += 2;
    angleY = angleY % 360;

    setPoints();
    draw();

    requestAnimationFrame(frame);    
}

function degToRad(deg)
{
    return deg * Math.PI / 180;
}

function main()
{
    console.log("drawing cube...");  
    ctx = setupCanvas();
    clearScreen();

    frame();
}
main();