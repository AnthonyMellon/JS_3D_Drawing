//Low level canvas control

let width;
let height;
let ctx;

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