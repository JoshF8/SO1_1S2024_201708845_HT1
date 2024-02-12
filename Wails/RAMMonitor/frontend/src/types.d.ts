export interface RAMData{
    freeRAM:number,
    state: warningState
}

//Los distintos estados en los que puede estar
export enum warningState{
    low,
    medium,
    high,
    critical
}