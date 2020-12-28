import {Person} from './person.js';

export class Employee extends Person{
    constructor(name, salary){
        super(name);
        this.salary = salary;
    }
    work() {
        console.log(`${this.name} is currently working.`);
    }
    getSalary() {
        console.log(`${this.name} has a salary of ${this.salary}.`);
    }
    vacation() {
        console.log(`${this.name} is currently taking a vacation.`);
    }
    details() {
        super.details();
        console.log("Details from employee.")
    }
}