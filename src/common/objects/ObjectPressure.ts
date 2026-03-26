export class ObjectPressure {
    pascal: number|null=null;
    constructor () {
        this.pascal = null;
    }
    raisePressure(amount: number) {
        if (this.pascal) this.pascal += amount;
    }
    lowerPressure(amount: number) {
        if (this.pascal) this.pascal -= amount;
    }
}