export class ObjectMass {
    kilograms: number|null = null;
    constructor () {
        this.kilograms = null;
    }
    raiseMass(amount: number) {
        if (this.kilograms) this.kilograms += amount;
    }
    lowerMass(amount: number) {
        if (this.kilograms) this.kilograms -= amount;
    }
}