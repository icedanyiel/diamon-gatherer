export class Person {
    constructor(name){
        this.name = name;
    }
    walk() {
        console.log(`${this.name} is walking.`);
    }

    details() {
        console.log("Details from person.")
    }

}