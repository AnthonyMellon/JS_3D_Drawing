class CubeManager {
    
    CUBE_SIZE = 100;
    NUM_CUBES_X = 10;
    NUM_CUBES_Y = 10;

    myCubes;

    constructor() {

    }

    //generate the 2d array of cubes, giving them starting positions and rotations
    generateCubes()
    {
        //Create the lines of cubes along the x axis
        this.myCubes = [];
        for(let X = 0; X < this.NUM_CUBES_X; X++)
        {
            //Create a line of cubes along the y axis
            let tempCubes = [];
            for(let Y = 0; Y < this.NUM_CUBES_Y; Y++)
            {
                tempCubes.push(new Cube(this.CUBE_SIZE, [X * this.CUBE_SIZE, Y * this.CUBE_SIZE, 0]));
                tempCubes[Y].resetVertices();
                tempCubes[Y].setupFaces();
            }
            this.myCubes.push(tempCubes);
        }        
    }

    rotateCubes(cameraPosition, cameraRotation)
    {
        this.myCubes.forEach(cubeLine => {
            cubeLine.forEach(cube => {
                cube.resetVertices();
                cube.rotate(0, cameraRotation[0]);
                cube.rotate(1, cameraRotation[1]);
                cube.rotate(2, cameraRotation[2]);
                cube.setupFaces(); 
            });
        });
    }

    getCubes() {
        return this.myCubes;
    }

}