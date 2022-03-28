import { Color, ExecutionStatus, Face } from './enums';

export interface Message {
    command: string;
    message: string;
    type: ExecutionStatus;
}

export interface Coordinates {
    rowPos: number;
    colPos: number;
}

export class Position {
    rowPos: number;
    colPos: number;
    pawnFace: Face;
    pawnColor: Color;
    isFirstMoveCompleted?= false;
    log?: Message;
    isPawnPlacedOnBoard?= false;

    constructor() {
        this.rowPos = -1;
        this.colPos = -1;
        this.pawnFace = Face.none;
        this.pawnColor = Color.none;
        this.isFirstMoveCompleted = false;
        this.log = null;
        this.isPawnPlacedOnBoard = false;
    }
}
