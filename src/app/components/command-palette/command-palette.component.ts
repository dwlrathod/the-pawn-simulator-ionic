import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-command-palette',
  templateUrl: './command-palette.component.html',
  styleUrls: ['./command-palette.component.scss'],
})
export class CommandPaletteComponent implements OnInit {

  command = '';

  constructor() { }

  ngOnInit() { }

}
