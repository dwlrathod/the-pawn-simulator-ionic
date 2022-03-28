import { Component, OnInit } from '@angular/core';
import { Message, Position } from 'src/app/models/models';
import { PawnService } from 'src/app/services/pawn.service';
import { map } from 'rxjs/operators';
import { ActionSheetService } from 'src/app/services/action-sheet.service';
import { Color, Command, ExecutionStatus, Face } from 'src/app/models/enums';
import { GLOBAL_CONSTANTS } from 'src/app/global-constants';

@Component({
  selector: 'app-command-palette',
  templateUrl: './command-palette.component.html',
  styleUrls: ['./command-palette.component.scss'],
})
export class CommandPaletteComponent implements OnInit {

  command = '';
  position: Position;

  constructor(
    private pawnService: PawnService,
    private actionSheetService: ActionSheetService,
  ) { }

  ngOnInit() {
    this.pawnService
      .observePawn()
      .pipe(map((position: Position) => {
        this.position = position;
        return position;
      })).subscribe();
  }

  onPlace() {
    this.pawnService.setPawn(new Position());
    this.pawnService.setPawnPlaceMode(true);
    const pawnCoordinateSubscription = this.pawnService.observePawnCoordinates()
      .subscribe(async coordinate => {
        if (coordinate) {
          this.pawnService.setPawnPlaceMode(false);
          const pawnFace = await this.actionSheetService.showPawnFaceChooser();
          const pawnColor = await this.actionSheetService.showPawnColorChooser();
          this.pawnService.setPawnCoordinates(null);
          this.executeCommand(`PLACE ${coordinate.colPos},${coordinate.rowPos},${pawnFace},${pawnColor}`);
          pawnCoordinateSubscription.unsubscribe();
        }
      });
  }

  async onLeft() {
    this.executeCommand(`LEFT`);
  }

  async onMove() {
    let moves = 1;
    if (!this.position.isFirstMoveCompleted) {
      moves = await this.actionSheetService.showPawnMoveChooser();
    }
    this.executeCommand(`MOVE ${moves}`);
  }

  async onRight() {
    this.executeCommand(`RIGHT`);
  }

  async onReport() {
    this.executeCommand(`REPORT`);
  }

  async executeCommand(commandStr: string) {
    let oldFaceIndex: number;
    let newFaceIndex: number;
    const commandArr = commandStr.split(' ')[0];
    if (!this.position.isPawnPlacedOnBoard && commandArr !== Command.place) {
      this.throwInvalidPlaceError(commandStr);
      return;
    }
    switch (commandArr) {
      case Command.place:
        const argumentList = commandStr.split(' ')[1].split(',');
        this.position = {
          colPos: Number(argumentList[0]),
          rowPos: Number(argumentList[1]),
          pawnFace: Face[argumentList[2]],
          pawnColor: Color[argumentList[3]],
          isFirstMoveCompleted: false,
        };
        this.position.isPawnPlacedOnBoard = true;
        this.position.log =
          { command: commandStr.toUpperCase(), type: ExecutionStatus.success, message: GLOBAL_CONSTANTS.success.validPlace };
        break;
      case Command.move:
        const moves = Number(commandStr.split(' ')[1]) || 1;
        this.position.isFirstMoveCompleted = true;
        let invalidMove = false;
        switch (this.position.pawnFace) {
          case Face.south:
            if (this.position.colPos - moves >= 0) {
              this.position.colPos -= moves;
            } else {
              invalidMove = true;
            }
            break;
          case Face.west:
            if (this.position.rowPos - moves >= 0) {
              this.position.rowPos -= moves;
            } else {
              invalidMove = true;
            }
            break;
          case Face.north:
            if (this.position.colPos + moves < GLOBAL_CONSTANTS.columnLength) {
              this.position.colPos += moves;
            } else {
              invalidMove = true;
            }
            break;
          case Face.east:
            if (this.position.rowPos + moves < GLOBAL_CONSTANTS.rowLength) {
              this.position.rowPos += moves;
            } else {
              invalidMove = true;
            }
            break;
        }
        if (!invalidMove) {
          this.position.log = { command: commandStr, type: ExecutionStatus.success, message: GLOBAL_CONSTANTS.success.validMove };
        } else {
          this.position.log = { command: commandStr, type: ExecutionStatus.error, message: GLOBAL_CONSTANTS.error.invalidMove };
        }
        break;
      case Command.left:
        oldFaceIndex = Object.values(Face).indexOf(this.position.pawnFace);
        newFaceIndex = oldFaceIndex === 0 ? 3 : oldFaceIndex - 1;
        this.position.pawnFace = Object.values(Face)[newFaceIndex];
        this.position.log = { command: commandStr, type: ExecutionStatus.success, message: GLOBAL_CONSTANTS.success.validLeft };
        break;
      case Command.right:
        oldFaceIndex = Object.values(Face).indexOf(this.position.pawnFace);
        newFaceIndex = oldFaceIndex === 3 ? 0 : oldFaceIndex + 1;
        this.position.pawnFace = Object.values(Face)[newFaceIndex];
        this.position.log = { command: commandStr, type: ExecutionStatus.success, message: GLOBAL_CONSTANTS.success.validRight };
        break;
      case Command.report:
        this.position.log = {
          command: `${commandStr} ${this.stringValue()}`,
          type: ExecutionStatus.success,
          message: GLOBAL_CONSTANTS.success.validReport
        };
        break;
    }
    this.pawnService.setPawn(this.position);
  }

  private throwInvalidPlaceError(command: string) {
    this.position.log = { command, type: ExecutionStatus.error, message: GLOBAL_CONSTANTS.error.invalidPlace };
    this.pawnService.setPawn(this.position);
  }

  private stringValue(): string {
    return `Output: `
      + `${this.position.rowPos},${this.position.colPos},${this.position.pawnFace},${this.position.pawnColor}`.toUpperCase();
  }
}
