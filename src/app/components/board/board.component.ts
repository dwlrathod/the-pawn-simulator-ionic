import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { GLOBAL_CONSTANTS } from 'src/app/global-constants';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {

  public cellSize: number;
  public rows = [...Array(GLOBAL_CONSTANTS.rowLength).keys()];
  public cols = [...Array(GLOBAL_CONSTANTS.columnLength).keys()];

  constructor(
    private platform: Platform,
  ) {
    this.platform.resize.subscribe(_ => {
      this.cellSize = (this.platform.width() - (this.platform.width() * 0.11)) / GLOBAL_CONSTANTS.rowLength;
    });
    this.cellSize = (this.platform.width() - (this.platform.width() * 0.11)) / GLOBAL_CONSTANTS.rowLength;
  }

  ngOnInit() { }

}
