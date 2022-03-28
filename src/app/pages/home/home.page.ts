import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GLOBAL_CONSTANTS } from 'src/app/global-constants';
import { Color, ExecutionStatus, Face } from 'src/app/models/enums';
import { Position } from 'src/app/models/models';
import { PawnService } from 'src/app/services/pawn.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  pawnPlaceMode$: Observable<boolean>;

  constructor(private pawnService: PawnService) { }

  ngOnInit() {
    this.pawnService.setPawn(new Position());
    this.pawnPlaceMode$ = this.pawnService.observePawnPlaceMode();
    this.pawnService.setPawnPlaceMode(false);
  }
}
