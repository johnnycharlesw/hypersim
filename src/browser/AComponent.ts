export interface AComponent {
    schema: object;
    init(): null;
    update(): null;
    tick(): null;
    remove(): null;
    pause(): null;
    play(): null;

}