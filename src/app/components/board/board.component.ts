import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { GLOBAL_CONSTANTS } from 'src/app/global-constants';
import { Position } from 'src/app/models/models';
import { Color } from 'src/app/models/enums';
import { PawnService } from 'src/app/services/pawn.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {

  public cellSize: number;
  public rows = [...Array(GLOBAL_CONSTANTS.rowLength).keys()];
  public cols = [...Array(GLOBAL_CONSTANTS.columnLength).keys()];
  public pawnPosition: Position;
  public pawnColor: typeof Color = Color;
  public pawnPlaceMode = false;

  constructor(
    private platform: Platform,
    private pawnService: PawnService,
  ) {
    this.platform.resize.subscribe(_ => {
      this.cellSize = (this.platform.width() - (this.platform.width() * 0.11)) / GLOBAL_CONSTANTS.rowLength;
    });
    this.cellSize = (this.platform.width() - (this.platform.width() * 0.11)) / GLOBAL_CONSTANTS.rowLength;
  }

  ngOnInit() {
    this.pawnService.observePawn().subscribe(position => this.pawnPosition = position);
    this.pawnService.observePawnPlaceMode().subscribe(pawnPlaceMode => this.pawnPlaceMode = pawnPlaceMode);
  }

  onCellClick(colPos: number, rowPos: number) {
    if (this.pawnPlaceMode) {
      this.pawnService.setPawnCoordinates(null);
      this.pawnService.setPawnCoordinates({ colPos, rowPos });
    }
  }

}
