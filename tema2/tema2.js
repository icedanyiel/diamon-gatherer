var aboutMe = ["Love", "I", "Javascript"];
aboutMe.splice(1, 1)
aboutMe.unshift("I");
console.log(aboutMe);

var matrice = ["Paul", 1, false, { name: "Jon Snow"}, [1, 2, 3], null, undefined, function() { console.log('Test')} ];
for (i = 0; i<matrice.length; i++) {
    console.log("pozitia: ",matrice.indexOf(matrice[i]), "; valoarea: ", matrice[i], "; tipul: ", typeof(matrice[i]));
}

class Phone {
    constructor(name, os, cameras, weight, price){
        this.name = name;
        this.os = os;
        this.cameras = cameras;
        this.weight = weight;
        this.price = price;
    }
    turnOn() {
        console.log(this.name, "was turned on.")
    }
    batteryCheck() {
        console.log("Your ", this.name, " has 56% battery.");
    }
    restartPhone() {
        console.log("The ", this.name, " is restarting.");
    }
}

let iPhone = new Phone("iPhone", "iOS", "228gr", "1000");
let samsung = new Phone("Galaxy S10", "Android", "200gr", "600");
let nokia = new Phone("Nokia 5320", "Symbian", "195gr", "50");
iPhone.turnOn();
samsung.batteryCheck();
nokia.restartPhone();
