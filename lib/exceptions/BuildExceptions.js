export class BuildError extends Error {
    constructor(message){
        super(message);
        this.name = "BuildError";
    }
}