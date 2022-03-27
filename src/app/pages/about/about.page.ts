import { Component, OnInit } from '@angular/core';
import { GLOBAL_CONSTANTS } from 'src/app/global-constants';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {

  commandList = GLOBAL_CONSTANTS.aboutCommands;

  constructor() { }

  ngOnInit() { }

}
