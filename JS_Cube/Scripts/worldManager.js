//Manages the drawing of the world

class WorldManager {

    CUBE_SIZE = 100;

    ctx;
    width;
    height;
    cubes;

    rotX = 0;
    rotY = 0;
    rotZ = 0;

    constructor(ctx, width, height) {
        this.ctx = ctx;
        this.width = width;
        this.height = height;
    }; 

    generateCubesList() {

        let numCubes = Math.ceil(this.width/this.CUBE_SIZE); 
        numCubes = 1;       

        this.cubes = Array(numCubes);
        for(let i = 0; i < numCubes; i++)
        {
            this.cubes[i] = new Cube(this.CUBE_SIZE, [(width/2*(i+1)), //X
                                                      (height/2),   //Y
                                                       0                  //Z
                                                     ]);
            this.cubes[i].resetVertices();
            this.cubes[i].setupFaces();
        }
    };  
    
    updateCubesList() {

    };

    rotateCubes() {
        this.cubes.forEach(cube => {
            cube.resetVertices();
            cube.Rotate(0, this.rotX);
            cube.Rotate(1, this.rotY);
            cube.Rotate(2, this.rotZ);
            cube.setupFaces();
        });
    }

    drawCubes(drawMode, lineWidth) {

        this.ctx.lineWidth = lineWidth        

        this.cubes.forEach(cube => {

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
    };

    move() {

        let speed = 2

        switch (currentKey) {
            case 'w':
                this.rotX = speed;
                break;
            case 's':
                this.rotX = -speed;
                break;
            case 'a':
                this.rotY = speed;
                break;
            case 'd':
                this.rotY = -speed;
                break;   
            case 'ArrowUp':
                this.rotZ = speed;
                break;
            case 'ArrowDown':
                this.rotZ = -speed;
                break;
            default:
                this.rotX = 0;
                this.rotY = 0;
                this.rotZ = 0;

        }
        
    }
}