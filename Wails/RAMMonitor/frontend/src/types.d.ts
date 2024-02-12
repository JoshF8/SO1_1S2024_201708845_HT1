import { Key } from "react"


export interface RAMData {
    usedRAM: number,
    state: warningState
}

export interface windowSize {
    width: number,
    height: number
}

//Los distintos estados en los que puede estar
export enum warningState {
    low,
    medium,
    high,
    critical
}
