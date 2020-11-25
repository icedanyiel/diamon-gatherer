export class Animal {
    constructor(name) {
        this.name = name;
    }
    canEat() {
        console.log(this.name + " can eat");
    }
    canSpeak() {
        console.log(this.name + " can speak");
    }
}