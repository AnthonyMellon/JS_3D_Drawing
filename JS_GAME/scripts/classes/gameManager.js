class GameManager {
    myCam;
    myCubeManager;

    constructor() {
        this.myCam = new Camera();
        this.myCubeManager = new CubeManager();
    }

    runGameFrame() {

        //update camera position

        //update camera rotation

        //send camera position to cube manager

        //send camera rotation to cube manager

        //generate cubes statically  <- the temp solution
        this.myCubeManager.generateCubes(); 
        this.myCubeManager.rotateCubes([0, 0, 0], [45, 45, 0]);       

        //generate cubes from memory based on what camera can 'see' <- very later on type meme

        //rotate cubes based on cam position / rotation

        //send camera position and cubes to renderer


    }

    returnCubes() {
        return this.myCubeManager.getCubes();
    }
}