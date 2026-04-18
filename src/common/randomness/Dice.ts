export class Dice {
    seed: number;
    constructor(seed: number|null){
        if (seed) {
            this.seed=seed;
        } else {
            this.seed=new Date().getTime();
        }
    }

    randomFraction(): number{
        return Math.random();
    }

    randomMixedNumberBetween(min: number, max: number): number {
        let base = this.randomFraction();
        let random = base * (max-min) + min;
        return random;
    }

    randomIntBetween(min: number, max: number): number {
        return Math.round(this.randomMixedNumberBetween(min,max));
    }
}