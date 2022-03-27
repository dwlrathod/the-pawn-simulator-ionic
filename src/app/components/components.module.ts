import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { BoardComponent } from './board/board.component';
import { CommandPaletteComponent } from './command-palette/command-palette.component';
import { LogsComponent } from './logs/logs.component';

@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        FormsModule,
    ],
    declarations: [
        BoardComponent,
        CommandPaletteComponent,
        LogsComponent,
    ],
    exports: [
        BoardComponent,
        CommandPaletteComponent,
        LogsComponent,
    ]
})
export class ComponentsModule { }
