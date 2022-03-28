import { Injectable } from '@angular/core';
import { ActionSheetButton, ActionSheetController } from '@ionic/angular';
import { GLOBAL_CONSTANTS } from '../global-constants';
import { Color, Face } from '../models/enums';

@Injectable({
  providedIn: 'root'
})
export class ActionSheetService {

  constructor(public actionSheetController: ActionSheetController) { }

  async showPawnFaceChooser(): Promise<Face> {
    const buttons: ActionSheetButton[] = [];
    GLOBAL_CONSTANTS.faceArray
      .forEach(face => buttons.push({ text: face, data: face.toLowerCase(), icon: GLOBAL_CONSTANTS.faceIcons[face.toLocaleLowerCase()] }));
    return await this.presentActionSheet<Face>(buttons, 'Choose Pawn Face');
  }

  async showPawnColorChooser(): Promise<Color> {
    const buttons: ActionSheetButton[] = [];
    Object.keys(Color)
      .filter(color => Face[color] !== Color.none)
      .forEach(color => {
        buttons.push({
          text: Color[color],
          data: color,
          icon: GLOBAL_CONSTANTS.colorIcons.icon,
          cssClass: GLOBAL_CONSTANTS.colorIcons[color]
        });
      });
    return await this.presentActionSheet<Color>(buttons, 'Choose Pawn Color');
  }

  async showPawnMoveChooser(): Promise<number> {
    const buttons: ActionSheetButton[] = [];
    [1, 2]
      .forEach((move, index) => buttons.push({ text: `+${move.toString()} Squares`, data: move, icon: GLOBAL_CONSTANTS.moveIcons[index] }));
    return await this.presentActionSheet<number>(buttons, 'Choose Pawn Moves');
  }

  private async presentActionSheet<T>(buttons: ActionSheetButton[], header: string): Promise<T> {
    const actionSheet = await this.actionSheetController.create({ header, buttons, backdropDismiss: false });
    await actionSheet.present();
    const { data } = await actionSheet.onDidDismiss();
    return data;
  }

}
