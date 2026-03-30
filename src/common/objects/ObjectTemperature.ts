export class ObjectTemperature {
    fahrenheit: number|null = null;
    constructor () {
        this.fahrenheit = null;
    }

    raiseTemperature(amount: number) {
        if (this.fahrenheit) this.fahrenheit += amount;
    }

    lowerTemperature(amount: number) {
        if (this.fahrenheit) this.fahrenheit -= amount;
    }
}