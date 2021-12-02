class Cube {
    size;
    position;
    vertices = Array(8);
    faces = Array(6);
    rotation = [
        0, //X
        0, //Y
        0  //Z
    ];

    constructor(size, position) {
        this.size = size;
        this.position = position;
    };
    
    resetVertices() {
        this.vertices[0] = [this.position[0] - this.size/2, this.position[1] - this.size/2, this.position[2] + this.size/2];
        this.vertices[1] = [this.position[0] + this.size/2, this.position[1] - this.size/2, this.position[2] + this.size/2];
        this.vertices[2] = [this.position[0] + this.size/2, this.position[1] + this.size/2, this.position[2] + this.size/2];
        this.vertices[3] = [this.position[0] - this.size/2, this.position[1] + this.size/2, this.position[2] + this.size/2];
        this.vertices[4] = [this.position[0] - this.size/2, this.position[1] - this.size/2, this.position[2] - this.size/2];
        this.vertices[5] = [this.position[0] + this.size/2, this.position[1] - this.size/2, this.position[2] - this.size/2];
        this.vertices[6] = [this.position[0] + this.size/2, this.position[1] + this.size/2, this.position[2] - this.size/2];
        this.vertices[7] = [this.position[0] - this.size/2, this.position[1] + this.size/2, this.position[2] - this.size/2];
    };

    setupFaces() {
        let myVertices = Array(4);

        //Front Face
        myVertices = [
            this.vertices[0],
            this.vertices[1],
            this.vertices[2],
            this.vertices[3],
        ];
        this.faces[0] = {
            vertices: myVertices,
            centerPoint: this.findAverageVertex(myVertices),
            colour: 'rgba(255, 0, 0, 1)'
        }; 

        //Back Face
        myVertices = [
            this.vertices[4],
            this.vertices[5],
            this.vertices[6],
            this.vertices[7],
        ];
        this.faces[1] = {
            vertices: myVertices,
            centerPoint: this.findAverageVertex(myVertices),
            colour: 'rgba(0, 0, 255, 1)'
        }; 

        //Left Face
        myVertices = [
            this.vertices[0],
            this.vertices[4],
            this.vertices[7],
            this.vertices[3],
        ];
        this.faces[2] = {
            vertices: myVertices,
            centerPoint: this.findAverageVertex(myVertices),
            colour: 'rgba(0, 255, 0, 1)'
        }; 

        //Right Face
        myVertices = [
            this.vertices[1],
            this.vertices[5],
            this.vertices[6],
            this.vertices[2],
        ];
        this.faces[3] = {
            vertices: myVertices,
            centerPoint: this.findAverageVertex(myVertices),
            colour: 'rgba(255, 255, 0, 1)'
        }; 

        //Top Face
        myVertices = [
            this.vertices[0],
            this.vertices[1],
            this.vertices[5],
            this.vertices[4],
        ];
        this.faces[4] = {
            vertices: myVertices,
            centerPoint: this.findAverageVertex(myVertices),
            colour: 'rgba(255, 0, 255, 1)'
        }; 

        //Bottom Face
        myVertices = [
            this.vertices[3],
            this.vertices[2],
            this.vertices[6],
            this.vertices[7],
        ];
        this.faces[5] = {
            vertices: myVertices,
            centerPoint: this.findAverageVertex(myVertices),
            colour: 'rgba(0, 255, 255, 1)'
        }; 
    };

    findAverageVertex(faceVertices) {
        let averageVertex = [0, 0, 0];

        //Sum up all vertices for each dimension
        for(let i = 0; i < averageVertex.length; i++) {
            for(let j = 0; j < faceVertices.length; j++) {
                averageVertex[i] += faceVertices[j][i];
            }
        }

        //Average the values on each dimension
        for(let i = 0; i < averageVertex.length; i++)
        {
            averageVertex[i] /= faceVertices.length;
        }

        return averageVertex;
    };

    rotate(axis, angle) {

        //Incriment the angle and restrict it to the range of 0 - 360
        this.rotation[axis] = angle;
        this.rotation[axis] = this.rotation[axis] % 360;

        //Used to ignroe position of rotation axis when translating cube to (0, 0)
        let tempPosition = [...this.position];
        tempPosition.splice(axis, 1);

        for(let i = 0; i < this.vertices.length; i++) {

            //Used to ignore rotational axis when rotating points
            let tempVertex = [...this.vertices[i]];
            //console.log(tempVertex);
            tempVertex.splice(axis, 1);

            //Center vertex on (0, 0) before rotation, then recenter at original position
            tempVertex[0] -= tempPosition[0];
            tempVertex[1] -= tempPosition[1];            
            let newVertex = rotatePoint([tempVertex[0], tempVertex[1]], degToRad(this.rotation[axis]));
            tempVertex[0] = newVertex[0];
            tempVertex[1] = newVertex[1];
            tempVertex[0] += tempPosition[0];
            tempVertex[1] += tempPosition[1];

            //Reinsert rotational axis into tempVertix and copy it all back over the corresponding vertix in the main vertices array
            tempVertex.splice(axis, 0, this.vertices[i][axis]);
            this.vertices[i] = [...tempVertex];
        }
    };

    getPosition() {
        return this.position;
    }
    setPosition(newPosition) {
        this.position = newPosition;
    }

    getSize() {
        return this.size;
    }
    setSize(newSize) {
        this.size = newSize;
    }

    getFaces() {
        return this.faces;
    }
}