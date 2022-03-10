class SpaceShuttle {
    constructor(targetPlanet){
        this.targetPlanet = targetPlanet;
    }

    get planet(){
        return this.targetPlanet;
    }

    set planet(updatedPlanet){
        this.targetPlanet = updatedPlanet;
    }

}

var zeus = new SpaceShuttle('Jupiter');

console.log(zeus.targetPlanet);

// if you want to import something you need to do export also