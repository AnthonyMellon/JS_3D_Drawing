//Everything to do with rendering to the canvas

class renderer {

    constructor() {

    }

    clearScreen(fillStyle) { //Reset the screen to given colour
        ctx.fillStyle = fillStyle;
        ctx.fillRect(0, 0, width, height);
    }
    
    drawCubes(cubes, drawMode, lineWidth)
    {
        cubes.forEach(cubeLine => {
            cubeLine.forEach(cube => {
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
                };

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
                };
            });
        });
    }
}
