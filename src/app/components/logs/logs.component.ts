import { Component, OnInit } from '@angular/core';
import { ExecutionStatus } from 'src/app/models/enums';
import { Message } from 'src/app/models/models';
import { PawnService } from 'src/app/services/pawn.service';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss'],
})
export class LogsComponent implements OnInit {

  logs: Message[] = [];
  public executionStatus: typeof ExecutionStatus = ExecutionStatus;

  constructor(private pawnService: PawnService) { }

  ngOnInit() {
    this.pawnService.observePawn().subscribe(position => {
      if (position?.log) { this.logs.push(position?.log); }
    });
  }

  clearLogs() {
    this.logs = [];
  }

}
