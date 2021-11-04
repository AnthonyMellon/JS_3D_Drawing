//The cube class

class Cube {

    rotation = [
        0, //X
        0, //Y 
        0  //Z
    ];

    vertices = Array(8);

    faces = Array(6);

    constructor(size, position) {
        this.size = size;
        this.position = position;
    }

    setPosition(newPosition) {
        this.position = newPosition;
    }

    setSize(newSize) {
        this.size = newSize;
    }

    setRotation(newRotation) {
        this.rotation = newRotation;
    }

    getRotation() {
        return this.rotation;
    }

    getFaces() {
        return this.faces;
    }

    setupCube() {

        this.setupVertices();

        for(let i = 0; i < 3; i++)
        {
            this.rotateCube(i)
        }

        //Front Face
        this.setupFace(
            this.faces[0], 
            [this.vertices[0], this.vertices[1], this.vertices[2], this.vertices[3]],
            'rgba(255, 0, 0, 75)'
        );

        //Back Face
        this.setupFace(
            this.faces[1], 
            [this.vertices[4], this.vertices[5], this.vertices[6], this.vertices[7]],
            'rgba(255, 0, 0, 75)'
        );

        //Left Face
        this.setupFace(
            this.faces[2], 
            [this.vertices[0], this.vertices[4], this.vertices[7], this.vertices[3]],
            'rgba(255, 0, 0, 75)'
        );

        //Right Face
        this.setupFace(
            this.faces[3], 
            [this.vertices[1], this.vertices[5], this.vertices[6], this.vertices[2]],
            'rgba(255, 0, 0, 75)'
        );

        //Top Face
        this.setupFace(
            this.faces[4], 
            [this.vertices[0], this.vertices[1], this.vertices[5], this.vertices[4]],
            'rgba(255, 0, 0, 75)'
        );

        //Bottom Face
        this.setupFace(
            this.faces[5], 
            [this.vertices[3], this.vertices[2], this.vertices[6], this.vertices[7]],
            'rgba(255, 0, 0, 75)'
        );
    }

    setupVertices() {
        this.vertices[0] = [this.position[0] - this.size/2, this.position[1] - this.size/2, this.position[2] + this.size/2];
        this.vertices[1] = [this.position[0] + this.size/2, this.position[1] - this.size/2, this.position[2] + this.size/2];
        this.vertices[2] = [this.position[0] + this.size/2, this.position[1] + this.size/2, this.position[2] + this.size/2];
        this.vertices[3] = [this.position[0] - this.size/2, this.position[1] + this.size/2, this.position[2] + this.size/2];
        this.vertices[4] = [this.position[0] - this.size/2, this.position[1] - this.size/2, this.position[2] - this.size/2];
        this.vertices[5] = [this.position[0] + this.size/2, this.position[1] - this.size/2, this.position[2] - this.size/2];
        this.vertices[6] = [this.position[0] + this.size/2, this.position[1] + this.size/2, this.position[2] - this.size/2];
        this.vertices[7] = [this.position[0] - this.size/2, this.position[1] + this.size/2, this.position[2] - this.size/2];
        console.log(this.vertices[0]);
        console.log(`Updated vertices: ${this.vertices}`);
        console.log(this.vertices);
    }

    setupFace(faceIndex, faceVertices, faceColour) {
        this.faces[faceIndex] = {
            vertices: faceVertices,
            centerPoint: this.findCenterPoint(faceVertices),
            colour: faceColour
        };        
        console.log(this.faces[faceIndex]);
    }

    rotateX() {
        for(let i = 0; i < this.vertices.length; i++)
        {
            this.vertices[i][1] -= this.position[1]; //Current vertix Y -= position along Y axis
            this.vertices[i][2] -= this.position[2]; //Current vertix Z -= position along Z axis
            let newVertixPosition = rotatePoint([this.vertices[i][1], this.vertices[i][2]], degToRad(this.rotation[0]));
            this.vertices[i][1] = newVertixPosition[0];
            this.vertices[i][2] = newVertixPosition[1];
            this.vertices[i][1] += this.position[1]; //Current vertix Y += position along Y axis          
            this.vertices[i][2] += this.position[2]; //Current vertix Z += position along Z axis          
        }
    }

    rotateY() {
        for(let i = 0; i < this.vertices.length; i++)
        {
            this.vertices[i][0] -= this.position[0]; //Current vertix X -= position along X axis
            this.vertices[i][2] -= this.position[2]; //Current vertix Z -= position along Z axis
            let newVertixPosition = rotatePoint([this.vertices[i][0], this.vertices[i][2]], degToRad(this.rotation[1]));
            this.vertices[i][0] = newVertixPosition[0];
            this.vertices[i][2] = newVertixPosition[1];
            this.vertices[i][0] += this.position[1]; //Current vertix X += position along X axis          
            this.vertices[i][2] += this.position[2]; //Current vertix Z += position along Z axis          
        }
    }

    rotateZ() {
        for(let i = 0; i < this.vertices.length; i++)
        {
            this.vertices[i][0] -= this.position[0]; //Current vertix X -= position along X axis
            this.vertices[i][1] -= this.position[1]; //Current vertix Y -= position along Y axis
            let newVertixPosition = rotatePoint([this.vertices[i][0], this.vertices[i][1]], degToRad(this.rotation[2]));
            this.vertices[i][0] = newVertixPosition[0];
            this.vertices[i][1] = newVertixPosition[1];
            this.vertices[i][0] += this.position[0]; //Current vertix X += position along X axis          
            this.vertices[i][1] += this.position[1]; //Current vertix Y += position along Y axis          
        }
    }

    rotateCube(axis) {
        for(let i = 0; i < this.vertices.length; i++)
        {
            //Used to ignore position of rotation axis when translating to 0, 0
            let tempPosition = this.position;
            tempPosition.splice(axis, 1);

            //Used to ignore rotational axis when rotating points
            let tempVertix = this.vertices[i];
            tempVertix.splice(axis, 1);

            //Center point on 0, 0 before rotation, then recenter at original position
            tempVertix[0] -= tempPosition[0];
            tempVertix[1] -= tempPosition[1];
            let newVertixPosition = rotatePoint([tempVertix[0], tempVertix[1], degToRad(this.rotation[axis])]);
            tempVertix[0] = newVertixPosition[0];
            tempVertix[1] = newVertixPosition[1];
            tempVertix[0] += tempPosition[0];
            tempVertix[1] += tempPosition[1];

            //Reinsert rotational axis into tempVertix and reassign it to the main vertices array
            tempVertix.splice(axis, 0, this.vertices[i][axis]);
            this.vertices[i] = tempVertix;
        }
    }

    normaliseAngles() {
        for(let i = 0; i < 3; i++) {
            this.rotation[i] = normaliseAngle(this.rotation[i]);
        }
    }

    findCenterPoint(faceVertices) {

        let centerPoint = [
            (faceVertices[0][0] + faceVertices[1][0] + faceVertices[2][0] + faceVertices[3][0])/4, //X
            (faceVertices[0][1] + faceVertices[1][1] + faceVertices[2][1] + faceVertices[3][1])/4, //Y
            (faceVertices[0][2] + faceVertices[1][2] + faceVertices[2][2] + faceVertices[3][2])/4  //Z
        ];
        
        return centerPoint;
    }
}