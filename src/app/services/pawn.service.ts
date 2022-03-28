import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Coordinates, Position } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class PawnService {

  private pawnPosition: BehaviorSubject<Position> = new BehaviorSubject(null);
  private pawnPlaceMode: BehaviorSubject<boolean> = new BehaviorSubject(false);

  private pawnCoordinates: BehaviorSubject<Coordinates> = new BehaviorSubject(null);

  constructor() { }

  observePawn(): Observable<Position> {
    return this.pawnPosition.asObservable();
  }

  setPawn(position: Position) {
    this.pawnPosition.next(position);
  }

  observePawnPlaceMode(): Observable<boolean> {
    return this.pawnPlaceMode.asObservable();
  }

  setPawnPlaceMode(value: boolean) {
    this.pawnPlaceMode.next(value);
  }

  observePawnCoordinates(): Observable<Coordinates> {
    return this.pawnCoordinates.asObservable();
  }

  setPawnCoordinates(coordinates: Coordinates) {
    this.pawnCoordinates.next(coordinates);
  }
}
